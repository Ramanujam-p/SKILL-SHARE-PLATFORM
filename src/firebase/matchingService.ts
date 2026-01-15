import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

/* ================= TYPES ================= */

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface UserProfile {
  displayName?: string;
  interests?: string[];
  skillLevel?: SkillLevel;
}

export interface MatchedPeer {
  id: string;
  name: string;
  interests: string[];
  skillLevel: SkillLevel;
  matchScore: number;
}

/* ================= HELPERS ================= */

function normalize(v?: string) {
  return v?.trim().toLowerCase();
}

/* ================= SCORE ================= */

function calculateMatchScore(
  me: UserProfile,
  other: UserProfile
): number {
  let score = 0;

  const myInterests = (me.interests ?? []).map(normalize).filter(Boolean);
  const theirInterests = (other.interests ?? []).map(normalize).filter(Boolean);

  /* ---------- INTEREST MATCH (60) ---------- */
  const shared = myInterests.filter(i => theirInterests.includes(i));

  if (shared.length > 0) {
    score += Math.min(60, shared.length * 30);
  } else {
    score += 10; // 👈 fallback instead of removing user
  }

  /* ---------- SKILL LEVEL (30) ---------- */
  const levelMap: Record<SkillLevel, number> = {
    beginner: 0,
    intermediate: 1,
    advanced: 2,
  };

  const diff = Math.abs(
    levelMap[me.skillLevel ?? "intermediate"] -
    levelMap[other.skillLevel ?? "intermediate"]
  );

  score += diff === 0 ? 30 : diff === 1 ? 20 : 10;

  /* ---------- BONUS (10) ---------- */
  if (theirInterests.length > 0) score += 10;

  return Math.min(100, Math.round(score));
}

/* ================= MAIN ================= */

export async function getMatchedPeers(
  currentUserId: string,
  limit = 10
): Promise<MatchedPeer[]> {

  const meSnap = await getDoc(doc(db, "users", currentUserId));
  if (!meSnap.exists()) return [];

  const me = meSnap.data() as UserProfile;

  const snap = await getDocs(collection(db, "users"));
  const matches: MatchedPeer[] = [];

  for (const d of snap.docs) {
    if (d.id === currentUserId) continue;

    const other = d.data() as UserProfile;

    const score = calculateMatchScore(me, other);

    matches.push({
      id: d.id,
      name: other.displayName ?? "Student",
      interests: other.interests ?? [],
      skillLevel: other.skillLevel ?? "intermediate",
      matchScore: score,
    });
  }

  return matches
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}
