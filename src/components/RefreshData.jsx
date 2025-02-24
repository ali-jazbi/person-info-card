import { Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const RefreshData = () => {
  const queryClient = useQueryClient();
  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => {
          queryClient.invalidateQueries({
            queryKey: ["people"],
          });
        }}
      >
        Reload data
      </Button>
    </div>
  );
};

export default RefreshData;
