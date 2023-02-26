import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "~/lib/utils/supabase";

const isAuthenticatedAtom = atom(false);

export const useUser = () => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          setIsAuthenticated(false);
          navigate("/signin", { replace: true });
          throw error;
        }

        if (data) setIsAuthenticated(true);
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, [setIsAuthenticated]);

  return [isAuthenticated, setIsAuthenticated];
};
