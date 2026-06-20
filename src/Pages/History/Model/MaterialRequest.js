import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Chip,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { CalendarToday, Refresh, Close } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";

const materialOptions = [
  "Cement",
  "Steel Bars",
  "Sand",
  "Bricks",
  "Timber",
  "Paint",
  "Plumbing Pipes",
];

const categoryOptions = [
  "Construction",
  "Electrical",
  "Plumbing",
  "Finishing",
  "Hardware",
];

const uomOptions = ["Kg", "Ton", "Litre", "Bag", "Piece", "Meter"];

const emptyRow = () => ({
  id: Date.now(),
  materialName: "",
  materialCategory: "",
  uom: "",
  availableStock: "-",
  quantity: "",
});

export default function MaterialRequest({ data }) {
  const [requiredDate, setRequiredDate] = useState(dayjs());
  const [purpose, setPurpose] = useState("");
  const [rows, setRows] = useState([emptyRow()]);
  const [open, setOpen] = useState(false);
  const handleCancel = () => {
    setRequiredDate("");
    setPurpose("");
    setRows([emptyRow()]);
  };
  const [value, setValue] = useState({});
  const fetchData = async () => {
    const payload = {
      material_request_id: data.MaterialRequestId,
    };
    await axios
      .post("http://10.10.0.101:8000/history/details", payload)
      .then((res) => {
        console.log(res.data);
        setValue(res.data.data);
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.detail || err.detail || "Something went wrong";
        sessionStorage.setItem("errormessge", errorMessage);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "5px",
      fontSize: "11px",
      fontFamily: "Poppins, sans-serif",
      backgroundColor: "#fff",
      minHeight: "34px",
      "& fieldset": {
        borderColor: "#d0d5dd",
      },
      "&:hover fieldset": {
        borderColor: "#a0a5b1",
      },
    },
    "& .MuiInputBase-input": {
      padding: "6px 10px",
      fontFamily: "Poppins, sans-serif",
      fontSize: "11px",
    },
  };

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
  const statusStyles = {
    Draft: {
      background: "#f2f4f7",
      color: "#667085",
    },
    Pending: {
      background: "#fff4e5",
      color: "#f79009",
    },
    Fulfilled: {
      background: "#e0f2fe",
      color: "#0284c7",
    },
    "L2 Review": {
      background: "#ede9fe",
      color: "#7c3aed",
    },
    Approved: {
      background: "#dcfce7",
      color: "#16a34a",
    },
    "L2 Rejected": {
      background: "#fee2e2",
      color: "#dc2626",
    },
  };

  const currentStyle = statusStyles[data.Status_text] || {
    background: "#f2f4f7",
    color: "#667085",
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: 4,
          right: 0,
          p: "3px",
          background: currentStyle.background,
          color: currentStyle.color,
          fontFamily: "Poppins",
          fontSize: "0.7rem",
          borderRadius: "15px",
          width: "80px",
          textAlign: "center",
        }}
      >
        {data.Status_text}
      </Box>
      {/* Title */}
      <Typography
        variant='h4'
        sx={{
          fontWeight: 700,
          color: "#101828",
          mb: 1,
          mt: 2,
          fontSize: "22px",
          fontFamily: "Poppins, sans-serif",
          textAlign: "center",
        }}
      >
        Material Request {data.MaterialRequestId}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          marginBottom: 2,
          mb: 4,
        }}
      >
        <Typography sx={{ fontFamily: "Poppins", fontSize: "12px" }}>
          <span style={{ fontWeight: 500 }}>Reference No </span>{" "}
          {value.referenceNo}
        </Typography>
        <Typography sx={{ fontFamily: "Poppins", fontSize: "12px" }}>
          <span style={{ fontWeight: 500 }}>Requested Date</span>{" "}
          {dayjs(value.requestedDate).format("DD-MMM-YYYY")}
        </Typography>
        <Typography sx={{ fontFamily: "Poppins", fontSize: "12px" }}>
          <span style={{ fontWeight: 500 }}>Approved on</span>{" "}
          {dayjs(value.approvedDate).format("DD-MMM-YYYY")}
        </Typography>
        <Typography sx={{ fontFamily: "Poppins", fontSize: "12px" }}>
          <span style={{ fontWeight: 500 }}>Fulfilled Date</span>{" "}
          {dayjs(value.fulfilledDate).format("DD-MMM-YYYY")}
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#F1F5F9",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 3,
          px: 2,
          borderRadius: "10px",
          fontFamily: "Poppins, sans-serif",
          mx: 3,
        }}
      >
        {/* Requirement Details */}
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 1100,
            borderRadius: "10px",
            border: "1px solid #e4e7ec",
            // backgroundColor: "#F1F5F9",
            p: 2,
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontWeight: 550,
                fontSize: "13px",
                color: "#101828",
                minWidth: 140,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Requirement Details
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "11px",
                color: "#344054",
                whiteSpace: "nowrap",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Required Date
            </Typography>

            <Typography
              sx={{
                fontSize: "0.7rem",
                fontFamily: "Poppins",
                fontWeight: 600,
              }}
            >
              {dayjs(value.requiredDate).format("DD-MMM-YYYY")}
            </Typography>
            {/* </LocalizationProvider> */}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flex: 1,
              minWidth: 250,
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "11px",
                color: "#344054",
                whiteSpace: "nowrap",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Purpose
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "11px",
                fontWeight: 600,
              }}
            >
              {" "}
              {value.purpose}
            </Typography>
          </Box>
        </Paper>

        {/* Material Details */}
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 1100,
            borderRadius: "10px",
            border: "1px solid #e4e7ec",
            // backgroundColor: "#F1F5F9",
            p: 2,
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontWeight: 550,
              fontSize: "13px",
              color: "#101828",
              mb: 1.5,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Material Details
          </Typography>

          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              border: "1px solid #d0d5dd",
              borderRadius: "6px",
              // overflow: "hidden",
            }}
          >
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ ...headerCellSx, width: "28%" }}>
                    Material Name
                  </TableCell>

                  <TableCell sx={{ ...headerCellSx, width: "22%" }}>
                    Material Category
                  </TableCell>

                  <TableCell sx={{ ...headerCellSx, width: "12%" }}>
                    UOM
                  </TableCell>

                  <TableCell sx={{ ...headerCellSx, width: "12%" }}>
                    Stock
                  </TableCell>

                  <TableCell
                    sx={{
                      ...headerCellSx,
                      width: "14%",
                      textAlign: "right",
                    }}
                  >
                    Quantity
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {value.materials?.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td": { border: 0 },
                      "&:hover": { bgcolor: "#F9FAFB" },
                    }}
                  >
                    <TableCell>
                      <Stack direction='row' spacing={0.8} alignItems='center'>
                        <Typography
                          sx={{
                            fontSize: "0.7rem",
                            fontFamily: "Poppins, sans-serif",
                            color: "#111827",
                          }}
                        >
                          {row.materialName}
                        </Typography>
                        {row.itemtag && (
                          <Chip
                            label={
                              row.itemTag === 1
                                ? "Critical"
                                : row.itemTag === 2
                                  ? "New"
                                  : ""
                            }
                            size='small'
                            sx={{
                              bgcolor:
                                row.itemTag === 1
                                  ? "#FEE2E2"
                                  : row.itemTag === 2
                                    ? "#DBEAFE"
                                    : "#F3F4F6",
                              color:
                                row.itemTag === 1
                                  ? "#EF4444"
                                  : row.itemTag === 2
                                    ? "#2563EB"
                                    : "#6B7280",
                            }}
                          />
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#6B7280",
                        textAlign: "center",
                        fontSize: "0.7rem",
                      }}
                    >
                      {row.category ? row.category : "-"}
                    </TableCell>
                    <TableCell sx={{ color: "#6B7280", fontSize: "0.7rem" }}>
                      {row.uom}
                    </TableCell>
                    <TableCell sx={{ color: "#6B7280", fontSize: "0.7rem" }}>
                      {row.availableStock}
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{
                        fontWeight: 600,
                        color: "#111827",
                        fontSize: "0.7rem",
                      }}
                    >
                      {row.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Add Material */}
          <Box sx={{ mt: 1.5 }}>
            {/* <Typography
            onClick={handleAddMaterial}
            sx={{
              color: "#3538cd",
              fontWeight: 600,
              fontSize: "11px",
              cursor: "pointer",
              textDecoration: "underline",
              display: "inline",
              fontFamily: "Poppins, sans-serif",
              "&:hover": {
                color: "#6172f3",
              },
            }}
          >
            + Add Material
          </Typography> */}
          </Box>
        </Paper>
      </Box>

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
                <TableRow>
                  <TableCell
                    sx={{
                      ...bodyCellSx,
                      borderBottom: "none",
                      fontWeight: 600,
                    }}
                  >
                    Fulfilled
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, borderBottom: "none" }}>
                    27 April 2026,10:12AM*Benita
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, borderBottom: "none" }}>
                    -
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    sx={{
                      ...bodyCellSx,
                      borderBottom: "none",
                      fontWeight: 600,
                    }}
                  >
                    Approved(L2)
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, borderBottom: "none" }}>
                    27 April 2026,10:12AM*Benita
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, borderBottom: "none" }}>
                    -
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      ...bodyCellSx,
                      borderBottom: "none",
                      fontWeight: 600,
                    }}
                  >
                    Approved(L1)
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, borderBottom: "none" }}>
                    27 April 2026,10:12AM*Benita
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, borderBottom: "none" }}>
                    -
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      ...bodyCellSx,
                      borderBottom: "none",
                      fontWeight: 600,
                    }}
                  >
                    Resubmitted
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, borderBottom: "none" }}>
                    27 April 2026,10:12AM*Benita
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, borderBottom: "none" }}>
                    The mask item has been removed from the request.
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, borderBottom: "none" }}>
                    <Link>View More</Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      ...bodyCellSx,
                      borderBottom: "none",
                      fontWeight: 600,
                    }}
                  >
                    Rejected(L1)
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, borderBottom: "none" }}>
                    27 April 2026,10:12AM*Benita
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, borderBottom: "none" }}>
                    Regarding the mask request does not comply with procurement
                    guidelines.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      ...bodyCellSx,
                      borderBottom: "none",
                      fontWeight: 600,
                    }}
                  >
                    Submitted
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, borderBottom: "none" }}>
                    27 April 2026,10:12AM*Benita
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, borderBottom: "none" }}>
                    -
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}
