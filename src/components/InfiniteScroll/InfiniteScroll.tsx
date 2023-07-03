"use client";
import React, { useCallback, useEffect } from "react";
import Loading from "../Loading";

type Props = {
  fetchData: any;
};
const InfiniteScroll = ({ fetchData }: Props) => {
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchData();
    }
  }, [fetchData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return <Loading />;
};

export default InfiniteScroll;
