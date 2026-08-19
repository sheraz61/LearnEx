import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading,refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout?.categories || []);
    }
  }, [data]);

  useEffect(() => {
    if (layoutSuccess) {
      refetch();
      toast.success("Categories updated successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [layoutSuccess, error, refetch]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newCategoriesHandler = () => {
    if (categories.length === 0 || categories[categories.length - 1].title !== "") {
      setCategories((prevCategory: any) => [
        ...prevCategory,
        {
          _id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
          title: "",
        },
      ]);
    } else {
      toast.error("Category title cannot be empty");
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((q) => q.title === "");
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data.layout?.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mt-0 hero-glass dark:bg-[#111C43]/60 bg-white/80 border border-slate-200 dark:border-white/10 shadow-lg p-8 rounded-xl max-w-[800px] mx-auto">
          <h1 className={`${styles.title} !text-[24px] font-semibold text-slate-800 dark:text-white mb-6 text-center`}>
            Edit Categories
          </h1>
          <div className="space-y-4">
            {categories &&
              categories.map((item: any, index: number) => {
                return (
                  <div className="flex items-center w-full gap-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-white/10 transition-colors hover:border-slate-300 dark:hover:border-white/20" key={index}>
                    <input
                      className="flex-1 bg-transparent outline-none font-Poppins text-[16px] text-slate-800 dark:text-white placeholder:text-slate-400"
                      value={item.title}
                      onChange={(e) =>
                        handleCategoriesAdd(item._id, e.target.value)
                      }
                      placeholder="Enter category title..."
                    />
                    <button 
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                      onClick={() => {
                        setCategories((prevCategory: any) =>
                          prevCategory.filter((i: any) => i._id !== item._id)
                        );
                      }}
                    >
                      <AiOutlineDelete className="text-[20px]" />
                    </button>
                  </div>
                );
              })}
          </div>
          
          <div className="w-full flex justify-center mt-6">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[var(--hero-accent)] bg-[var(--hero-accent)]/10 hover:bg-[var(--hero-accent)]/20 transition-colors font-Poppins font-medium"
              onClick={newCategoriesHandler}
            >
              <IoMdAddCircleOutline className="text-[20px]" />
              Add Category
            </button>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              className={`
                px-6 py-2.5 rounded-lg font-Poppins font-medium transition-all shadow-md
                ${
                  areCategoriesUnchanged(data.layout?.categories, categories) ||
                  isAnyCategoryTitleEmpty(categories)
                    ? "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed shadow-none"
                    : "bg-[#45CBA0] hover:bg-[#3ba885] text-white hover:shadow-lg hover:-translate-y-0.5"
                }
              `}
              disabled={areCategoriesUnchanged(data.layout?.categories, categories) || isAnyCategoryTitleEmpty(categories)}
              onClick={
                areCategoriesUnchanged(data.layout?.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                  ? () => null
                  : editCategoriesHandler
              }
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;