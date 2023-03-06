import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "~/lib/utils/supabase";
import { profileAtom } from "~/store";

const isAuthenticatedAtom = atom(false);
const userDataAtom = atom([]);

export const useUser = () => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userData, setUserData] = useAtom(userDataAtom);
  const [, setProfile] = useAtom(profileAtom);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          setIsAuthenticated(false);
          navigate("/signin", { replace: true });
          throw error;
        }

        if (data) {
          setUserData(data);
          setProfile({
            avatar: data.user.user_metadata.avatar_url,
            email: data.user.email,
            fullname: data.user.user_metadata.full_name,
          });
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, [setIsAuthenticated, setUserData, setProfile]);

  return { isAuthenticated, setIsAuthenticated, userData };
};
