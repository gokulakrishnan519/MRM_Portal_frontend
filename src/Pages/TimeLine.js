import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
function Timeline({ id }) {
  const [open, setOpen] = useState(false);
  const headerCellSx = {
    fontWeight: 600,
    fontSize: "11px",
    fontFamily: "Poppins, sans-serif",
    color: "#344054",
    backgroundColor: "#f2f4f7",
    borderBottom: "1px solid #d0d5dd",
    py: 0.8,
    px: 1.5,
    whiteSpace: "nowrap",
  };

  const bodyCellSx = {
    py: 1,
    px: 1,
    borderBottom: "1px solid #eaecf0",
    fontFamily: "Poppins, sans-serif",
    fontSize: "11px",
  };
  const [value, setValue] = useState({});
  const fetchactivity = async () => {
    const payload = {
      materialRequestId: id,
    };
    await axios
      .post("http://10.10.0.101:8000/activity/activitytimeline", payload)
      .then((res) => {
        console.log(res.data);
        setValue(res.data);
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.detail || err.detail || "Something went wrong";
        sessionStorage.setItem("errormessge", errorMessage);
      });
  };
  useEffect(() => {
    fetchactivity();
  }, []);
  return (
    <div>
      {" "}
      <hr
        style={{ textAlign: "center", marginTop: "30px", width: "900px" }}
      ></hr>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 1100,
          borderRadius: "10px",
          //   border: "1px solid #e4e7ec",
          // backgroundColor: "#F1F5F9",
          p: 2,
          mb: 3,
        }}
      >
        <Box
          onClick={() => setOpen((prev) => !prev)}
          sx={{
            display: "flex",
            alignItems: "center",
            height: "35px",
            cursor: "pointer",
          }}
        >
          <Typography
            variant='h6'
            sx={{ fontFamily: "Poppins", fontSize: "15px" }}
          >
            Activity Timeline
          </Typography>

          <ArrowDropDownIcon
            sx={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.3s ease",
            }}
          />
        </Box>
        {open && (
          <TableContainer>
            <Table size='small'>
              <TableBody>
                {value?.data?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        ...bodyCellSx,
                        borderBottom: "none",
                        fontWeight: 600,
                      }}
                    >
                      {item.activity}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...bodyCellSx,
                        borderBottom: "none",
                      }}
                    >
                      {`${dayjs(item.date).format("DD MMM YYYY, hh:mm A")} * ${
                        item.actor
                      }`}
                    </TableCell>

                    <TableCell
                      sx={{
                        ...bodyCellSx,
                        borderBottom: "none",
                      }}
                    >
                      {item.remarks || "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </div>
  );
}

export default Timeline;
