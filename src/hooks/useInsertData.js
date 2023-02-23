import supabase from "~/lib/utils/supabase";

export const useInsertData = async (tableName, newData) => {
  try {
    const { error } = await supabase.from(tableName).insert(newData);
    if (error) throw error;
  } catch (err) {
    console.error(err);
  }
};
