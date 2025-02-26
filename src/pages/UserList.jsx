import { useEffect } from "react";
import { Container, Grid, Pagination, Box } from "@mui/material";
import PersonCard from "../components/PersonCard";
import SearchFilter from "../components/SearchFilter";
import DialogBox from "../components/DialogBox";
import LoadingSkeletons from "../components/LoadingSkeletons";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { endpoints } from "../api/endpoints";
const ITEMS_PER_PAGE = 4;

const UserList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const axios = useAxiosPrivate();
  const auth = useAuth();
  // Data fetching
  const {
    data: people,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["people"],
    queryFn: () => {
      return axios.get(endpoints.user_get_users).then(({ data }) => data);
    },
  });

  let page = Number(searchParams.get("page") ?? 1);

  console.log("people :>> ", people);

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      prev.set("page", newPage);
      return prev;
    });
  };

  console.log({ auth });

  // Pagnation And Pages

  const filteredData = (people ?? [])?.filter((person) => {
    let isValid = {};
    if (searchParams.get("gender")) {
      if (person.gender === searchParams.get("gender") || searchParams.get("gender") == "all") {
        isValid.gender = true;
      } else {
        isValid.gender = false;
      }
    }
    if (searchParams.get("age")) {
      switch (searchParams.get("age")) {
        case "all":
          isValid.age = true;
          break;
        case "young":
          isValid.age = person.age <= 30;
          break;
        case "old":
          isValid.age = 30 < person.age;
          break;
      }
    }
    if (searchParams.get("search")) {
      isValid.search = (person?.FirstName + " " + person?.LastName)
        ?.toLowerCase()
        ?.includes(searchParams.get("search")?.toLowerCase());
    }

    return !Object.values(isValid)?.some((v) => v === false);
  });

  const paginatedData = filteredData?.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const pageCount = Math.ceil((filteredData?.length ?? 0) / ITEMS_PER_PAGE);

  useEffect(() => {
    setSearchParams((prev) => {
      prev?.delete("page");

      return prev;
    });
  }, [pageCount]);

  // Main render
  return (
    <Container>
      <Grid container spacing={3}>
        {/* Header and Search and Filter */}
        <SearchFilter />
        {/* Dialog Box Show */}
        <Grid item xs={12}>
          <DialogBox />
        </Grid>
        {/* Card Group */}
        <Grid item xs={12}>
          {isLoading ? (
            <LoadingSkeletons />
          ) : (
            // : isError ? (
            // <div>Error fetching data</div>
            // )
            <>
              <Grid container spacing={3}>
                {paginatedData.map((person) => (
                  <Grid item xs={12} sm={6} md={3} key={person.id}>
                    <PersonCard person={person} />
                  </Grid>
                ))}
              </Grid>
              {people && people.length > 0 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                  <Pagination
                    count={pageCount}
                    page={page}
                    onChange={(event, value) => handlePageChange(value)}
                    disabled={pageCount <= 1}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserList;
