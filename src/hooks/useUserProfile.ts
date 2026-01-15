import { useState,useEffect,useCallback } from "react";

import{
    doc,
    setDoc,
    updateDoc,
    onSnapshot,
    type DocumentData
} from 'firebase/firestore';

import{db} from '../lib/firebase';
import type { UserProfile,SkillLevel } from "../types/auth";
import { updatePassword } from "firebase/auth";

export const useUserProfile = (uid : string|null) =>{
    const [profile,setProfile] = useState<UserProfile|null> (null);
    const [loading,setLoading]  = useState(true);
    const [error,setError] = useState<string|null>(null);

    useEffect(()=>{
        if(!uid)
        {
            setProfile(null);
            setLoading(false);
            return;
        }

        const userDocRef = doc(db,'users',uid);

        const unsubscribe = onSnapshot(
            userDocRef,
            (snapshot)=>{
                if(snapshot.exists())
                {
                    const data = snapshot.data() as UserProfile;
                    setProfile(data);
                    console.log("Profile loaded:",data);
                }
                else{
                    setProfile(null);
                    console.log("No profile document found");
                }
                setLoading(false);
            },
            (err)=>{
                console.log("Profile fetch error:",err)
                setError(err.message);
                setLoading(false);
            }
        );

        return ()=>{
            console.log("Cleaning up profile listener");
            unsubscribe();
        };
    }, [uid]);

    const upsertProfile = useCallback(
        async (profileData : Partial<UserProfile>)=>{
            if(!uid)
            {
                setError("No user Id");
                return false;
            }
            
            try{
                setLoading(true);
                const userDocRef = doc(db,'users',uid);

                await setDoc(
                    userDocRef,
                    {
                        uid,
                        ...profileData,
                        lastUpdated : new Date().toISOString()
                    },
                    {
                        merge : true
                    }
                );
                console.log('Profile created/updated');
                return true;
            }
            catch(err){
                const message = (err as Error).message;
                setError(message);
                console.log("Upsert failed:",message);
                return false;
            }
            finally{
                setLoading(false);
            }
        },[uid]
    );

    const updateProfile = useCallback(
        async(updates : Partial<UserProfile>)=>{
            if(!uid){
                setError("No user ID");
                return false;
            }

            try{
                setLoading(true);
                const userDocRef = doc(db,'users',uid);

                await updateDoc(userDocRef,{
                    ...updates, 
                    lastUpdated : new Date().toISOString()
                });

                console.log('Profile updated successfully');
                return true;
            }
            catch(err){
               const message = (err as Error).message;
               setError(message);
               return false;
            }
            finally
            {
                setLoading(false);
            }
        },[uid]
    );

    const updateInterests = useCallback(
        async(interests : string[]) =>{
            return updateProfile({interests});
        },[updateProfile]
    );

    const updateSkillLevel = useCallback(
        async(skillLevel : SkillLevel) =>{
            return updateProfile({skillLevel});
        },[updateProfile]
    );

    return  {
        profile,
        loading,
        error,
        upsertProfile,
        updateProfile,
        updateSkillLevel,
        updateInterests
    };
};