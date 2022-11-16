import React, { createContext, useState } from "react";
import { useApi } from "./ApiProvider";

const DEFAULT_VALUE: {
  loading: boolean;
  categories: any[];
  getAll(): void;
  create(newCategoryData: Partial<any>): void;
  remove(id: number): void;
} = {
  loading: false,
  categories: [],
  getAll: () => {},
  create: () => {},
  remove: () => {},
};

export const CategoryContext = createContext(DEFAULT_VALUE);

export const useCategory = () => {
  const { loading, categories, getAll, create, remove } =
    React.useContext(CategoryContext);
  return {
    loading,
    categories,
    getAll,
    create,
    remove,
  };
};

export function CategoryProvider(props: { children: any }) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const { httpClient } = useApi();

  const getAll = async () => {
    try {
      if (!loading) {
        setLoading(true);
        const { data } = await httpClient.get("/categories");
        setCategories(data.data);
        setLoading(false);
      }
    } catch (e: any) {
      setLoading(false);
      throw e;
    }
  };

  const create = async (newCategoryData: Partial<any>) => {
    try {
      setLoading(true);
      const { data } = await httpClient.post("/categories", newCategoryData);
      setCategories([...categories, data]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  const remove = async (id: number) => {
    try {
      setLoading(true);
      const { data } = await httpClient.delete(`/categories/${id}`);
      setCategories([...categories].filter((a) => a.id !== id));
      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        loading,
        categories,
        getAll,
        create,
        remove,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
}
