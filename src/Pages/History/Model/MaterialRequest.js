import { useState } from "react";
import {
  Box,
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

export default function MaterialRequest({ mrDetails }) {
  const [requiredDate, setRequiredDate] = useState(dayjs());
  const [purpose, setPurpose] = useState("");
  const [rows, setRows] = useState([emptyRow()]);

  const handleCancel = () => {
    setRequiredDate("");
    setPurpose("");
    setRows([emptyRow()]);
  };

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
    py: 0.7,
    px: 1,
    borderBottom: "1px solid #eaecf0",
    fontFamily: "Poppins, sans-serif",
    fontSize: "11px",
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: 4,
          right: 0,
          p: "2px",
          background: "#c7c0f0",
          color: "#725cf2",
          fontFamily: "Poppins",
          fontSize: "12px",
          borderRadius: "15px",
          width: "80px",
          textAlign: "center",
        }}
      >
        {mrDetails.status}
      </Box>
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "#101828",
          mb: 1,
          fontSize: "22px",
          fontFamily: "Poppins, sans-serif",
          textAlign: "center",
        }}
      >
        Material Request {mrDetails.requestId}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        <Typography sx={{ fontFamily: "Poppins", fontSize: "12px" }}>
          <span style={{ fontWeight: 500 }}>Requested Date</span>{" "}
          {mrDetails.requestedOn}
        </Typography>
        <Typography sx={{ fontFamily: "Poppins", fontSize: "12px" }}>
          <span style={{ fontWeight: 500 }}>Approved on</span> 12 April 2026
        </Typography>
        <Typography sx={{ fontFamily: "Poppins", fontSize: "12px" }}>
          <span style={{ fontWeight: 500 }}>Approved on</span> 12 April 2026
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#eef0fb",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 3,
          px: 2,
          borderRadius: "10px",
          fontFamily: "Poppins, sans-serif",
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
            // backgroundColor: "#eef0fb",
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
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
            {/* <DatePicker
              value={requiredDate}
              onChange={(newValue) => setRequiredDate(newValue)}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  variant: "standard",

                  inputProps: {
                    readOnly: true,
                  },
                  sx: {
                    border: "1px solid #d0d5dd",
                    backgroundColor: "#fff",
                    borderRadius: "4px",
                    width: 130,
                  },
                  InputProps: {
                    disableUnderline: true,

                    sx: {
                      px: "8px",
                      fontSize: "0.8rem",
                      height: 30,

                      "& .MuiSvgIcon-root": {
                        fontSize: "1rem",
                      },
                    },
                  },
                },
              }}
              /> */}
            <Typography sx={{ fontSize: "0.7rem", fontFamily: "Poppins" }}>
              {mrDetails.requiredDate}
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
            <Typography>-</Typography>
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
            // backgroundColor: "#eef0fb",
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
              overflow: "hidden",
            }}
          >
            <Table size="small">
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
                <TableRow>
                  <TableCell sx={{ ...bodyCellSx, width: "12%" }}>
                    General Purpose
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, width: "12%" }}>
                    Solvant
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, width: "12%" }}>L</TableCell>
                  <TableCell sx={{ ...bodyCellSx, width: "12%" }}>
                    50L
                  </TableCell>
                  <TableCell
                    sx={{ ...bodyCellSx, width: "12%", textAlign: "right" }}
                  >
                    5L
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ ...bodyCellSx, width: "12%" }}>
                    Mild Detergent
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, width: "12%" }}>
                    Sanitation Suplies
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, width: "12%" }}>L</TableCell>
                  <TableCell sx={{ ...bodyCellSx, width: "12%" }}>
                    45kg
                  </TableCell>
                  <TableCell
                    sx={{ ...bodyCellSx, width: "12%", textAlign: "right" }}
                  >
                    5L
                  </TableCell>
                </TableRow>
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
      {/* Buttons */}
      {/* <Box sx={{ display: "flex", gap: 1.5 }}>
        <Button
          onClick={handleSubmit}
          sx={{
            background: "linear-gradient(135deg, #f78ca2 0%, #f9748f 100%)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "11px",
            fontFamily: "Poppins, sans-serif",
            px: 3,
            py: 0.8,
            borderRadius: "6px",
            textTransform: "none",
            minHeight: "34px",
            "&:hover": {
              background: "linear-gradient(135deg, #f9748f 0%, #f5576c 100%)",
            },
          }}
        >
          Submit Request
        </Button>

        <Button
          onClick={handleCancel}
          sx={{
            border: "1.5px solid #e74c3c",
            color: "#e74c3c",
            fontWeight: 600,
            fontSize: "11px",
            fontFamily: "Poppins, sans-serif",
            px: 3,
            py: 0.8,
            borderRadius: "6px",
            textTransform: "none",
            backgroundColor: "transparent",
            minHeight: "34px",
            "&:hover": {
              backgroundColor: "#fff5f5",
            },
          }}
        >
          Cancel
        </Button>
      </Box> */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 1100,
          borderRadius: "10px",
          //   border: "1px solid #e4e7ec",
          // backgroundColor: "#eef0fb",
          p: 2,
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontFamily: "Poppins", fontSize: "15px" }}
        >
          Activity Timeline
        </Typography>
        {/* <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{
                    ...bodyCellSx,
                    fontWeight: 600,
                    borderBotton: "none",
                  }}
                >
                  Fulfilled
                </TableCell>
                <TableCell sx={{ ...bodyCellSx, borderBotton: "none" }}>
                  27 April 2026, Benita
                </TableCell>
                <TableCell
                  sx={{
                    ...bodyCellSx,
                    borderBotton: "none",
                  }}
                >
                  -
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  sx={{
                    ...bodyCellSx,
                    fontWeight: 600,
                    borderBotton: "none",
                  }}
                >
                  Approved(L2)
                </TableCell>
                <TableCell
                  sx={{
                    ...bodyCellSx,
                    borderBotton: "none",
                  }}
                >
                  -
                </TableCell>
                <TableCell
                  sx={{
                    ...bodyCellSx,
                    borderBotton: "none",
                  }}
                >
                  -
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  sx={{
                    ...bodyCellSx,
                    fontWeight: 600,
                    borderBotton: "none",
                  }}
                >
                  Resubmitted
                </TableCell>
                <TableCell
                  sx={{
                    ...bodyCellSx,
                    borderBotton: "none",
                  }}
                >
                  Rima
                </TableCell>
                <TableCell
                  sx={{
                    ...bodyCellSx,
                    borderBotton: "none",
                  }}
                >
                  -
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  sx={{
                    ...bodyCellSx,
                    fontWeight: 600,
                    borderBotton: "none",
                  }}
                >
                  Rejected(L2){" "}
                </TableCell>
                <TableCell
                  sx={{
                    ...bodyCellSx,
                    borderBotton: "none",
                  }}
                >
                  25 April 2026
                </TableCell>
                <TableCell
                  sx={{
                    ...bodyCellSx,
                    borderBotton: "none",
                  }}
                >
                  -
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  sx={{
                    ...bodyCellSx,
                    fontWeight: 600,
                    borderBotton: "none",
                  }}
                >
                  Approved(L1)
                </TableCell>
                <TableCell
                  sx={{
                    ...bodyCellSx,
                    borderBotton: "none",
                  }}
                >
                  Completed
                </TableCell>
                <TableCell
                  sx={{
                    ...bodyCellSx,
                    borderBotton: "none",
                  }}
                >
                  -
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  sx={{
                    ...bodyCellSx,
                    fontWeight: 600,
                    borderBotton: "none",
                  }}
                >
                  Submitted
                </TableCell>
                <TableCell
                  sx={{
                    ...bodyCellSx,
                    borderBotton: "none",
                  }}
                >
                  No remarks
                </TableCell>
                <TableCell
                  sx={{
                    ...bodyCellSx,
                    borderBotton: "none",
                  }}
                >
                  -
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer> */}
      </Paper>
    </Box>
  );
}
