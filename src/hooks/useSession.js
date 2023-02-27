import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "~/lib/utils/supabase";

const isAuthenticatedAtom = atom(false);

export const useSession = () => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setIsAuthenticated(false);
        throw error;
      }

      if (data.session) {
        setIsAuthenticated(true);
        navigate("/", { replace: true });
      }
    };

    getSession();
  }, [setIsAuthenticated]);

  return [isAuthenticated];
};
