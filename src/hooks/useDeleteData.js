import supabase from "~/lib/utils/supabase";

export const useDeleteData = async (tableName, id) => {
  try {
    const { error } = await supabase.from(tableName).delete().eq("id", id);
    if (error) throw error;
  } catch (err) {
    console.error(err);
  }
};
