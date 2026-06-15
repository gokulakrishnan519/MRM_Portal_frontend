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

export default function CreateMaterialRequest() {
  const [requiredDate, setRequiredDate] = useState(dayjs());
  const [purpose, setPurpose] = useState("");
  const [rows, setRows] = useState([emptyRow()]);

  const handleAddMaterial = () => {
    setRows((prev) => [...prev, emptyRow()]);
  };

  const handleRemoveRow = (id) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleRefreshRow = (id) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...emptyRow(), id } : r)),
    );
  };

  const handleRowChange = (id, field, value) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );
  };

  const handleSubmit = () => {
    console.log({ requiredDate, purpose, rows });
    alert("Request Submitted!");
  };

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
    <Box
      sx={{
        backgroundColor: "#F1F5F9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 3,
        px: 2,
        fontFamily: "Poppins, sans-serif",
        borderRadius: "10px",
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "#101828",
          mb: 3,
          fontSize: "22px",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Create Material Request
      </Typography>

      {/* Requirement Details */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 1100,
          borderRadius: "10px",
          // border: "1px solid #e4e7ec",
          backgroundColor: "white",
          p: 2,
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
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

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
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
            Required Date <span style={{ color: "#e74c3c" }}>*</span>
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
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
            />
          </LocalizationProvider>
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

          <TextField
            size="small"
            fullWidth
            placeholder="Enter the Purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            sx={inputSx}
          />
        </Box>
      </Paper>

      {/* Material Details */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 1100,
          borderRadius: "10px",
          // border: "1px solid #e4e7ec",
          backgroundColor: "white",
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

                <TableCell
                  sx={{
                    ...headerCellSx,
                    width: "10%",
                    textAlign: "center",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} sx={{ backgroundColor: "#fff" }}>
                  {/* Material Name */}
                  <TableCell
                    sx={{
                      ...bodyCellSx,
                      "& .MuiOutlinedInput-root": {
                        height: 15,
                        marginY: 1,
                      },
                    }}
                  >
                    <Autocomplete
                      size="small"
                      options={materialOptions}
                      value={row.materialName || null}
                      onChange={(_, val) =>
                        handleRowChange(row.id, "materialName", val || "")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Material Name"
                          sx={inputSx}
                        />
                      )}
                      PaperComponent={({ children }) => (
                        <Paper
                          sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "13px",
                          }}
                        >
                          {children}
                        </Paper>
                      )}
                      sx={{
                        "& .MuiAutocomplete-inputRoot": {
                          padding: "0px 6px",
                          fontFamily: "Poppins, sans-serif",
                        },
                      }}
                    />
                  </TableCell>

                  {/* Material Category */}
                  <TableCell sx={bodyCellSx}>
                    <Select
                      size="small"
                      fullWidth
                      displayEmpty
                      value={row.materialCategory}
                      onChange={(e) =>
                        handleRowChange(
                          row.id,
                          "materialCategory",
                          e.target.value,
                        )
                      }
                      renderValue={(v) =>
                        v || (
                          <span
                            style={{
                              color: "#9aa0ac",
                              fontSize: 11,
                              fontFamily: "Poppins, sans-serif",
                            }}
                          >
                            Category
                          </span>
                        )
                      }
                      sx={{
                        fontSize: "11px",
                        fontFamily: "Poppins, sans-serif",
                        backgroundColor: "#fff",
                        borderRadius: "5px",
                        minHeight: "34px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#d0d5dd",
                        },
                        "& .MuiSelect-select": {
                          padding: "6px 10px",
                          fontFamily: "Poppins, sans-serif",
                        },
                      }}
                    >
                      {categoryOptions.map((c) => (
                        <MenuItem
                          key={c}
                          value={c}
                          sx={{
                            fontSize: "11px",
                            fontFamily: "Poppins, sans-serif",
                          }}
                        >
                          {c}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>

                  {/* UOM */}
                  <TableCell sx={bodyCellSx}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="UOM"
                      value={row.uom}
                      onChange={(e) =>
                        handleRowChange(row.id, "uom", e.target.value)
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          minHeight: "34px",
                          backgroundColor: "#fff",
                          borderRadius: "5px",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "11px",
                        },
                        "& .MuiOutlinedInput-input": {
                          padding: "6px 10px",
                          fontSize: "11px",
                          fontFamily: "Poppins, sans-serif",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#d0d5dd",
                        },
                      }}
                    />
                  </TableCell>

                  {/* Stock */}
                  <TableCell
                    sx={{
                      ...bodyCellSx,
                      textAlign: "center",
                      color: "#667085",
                    }}
                  >
                    {row.availableStock}
                  </TableCell>

                  {/* Quantity */}
                  <TableCell sx={bodyCellSx}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Quantity"
                      type="number"
                      value={row.quantity}
                      onChange={(e) =>
                        handleRowChange(row.id, "quantity", e.target.value)
                      }
                      sx={{
                        ...inputSx,
                        "& .MuiInputBase-input": {
                          padding: "6px 10px",
                          textAlign: "right",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "11px",
                        },
                      }}
                    />
                  </TableCell>

                  {/* Actions */}
                  <TableCell
                    sx={{
                      ...bodyCellSx,
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 0.3,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleRefreshRow(row.id)}
                        sx={{
                          color: "#b0b7c3",
                          p: 0.4,
                          "&:hover": {
                            color: "#6172f3",
                          },
                        }}
                      >
                        <Refresh sx={{ fontSize: 16 }} />
                      </IconButton>

                      <IconButton
                        size="small"
                        onClick={() => handleRemoveRow(row.id)}
                        disabled={rows.length === 1}
                        sx={{
                          color: "#b0b7c3",
                          p: 0.4,
                          "&:hover": {
                            color: "#e74c3c",
                          },
                        }}
                      >
                        <Close sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Material */}
        <Box sx={{ mt: 1.5 }}>
          <Typography
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
          </Typography>
        </Box>
      </Paper>

      {/* Buttons */}
      <Box sx={{ display: "flex", gap: 1.5 }}>
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
      </Box>
    </Box>
  );
}
