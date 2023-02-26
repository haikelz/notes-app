import supabase from "~/lib/utils/supabase";

export const insertData = async (tableName, newData) => {
  try {
    const { error } = await supabase.from(tableName).insert(newData);
    if (error) throw error;
  } catch (err) {
    console.error(err);
  }
};
