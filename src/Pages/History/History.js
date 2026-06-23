import React, { useEffect, useState } from "react";
import Navbar from "../../Navbars/Navbar";
import right_icon from "../../Images/Home/Right_icon.png";
import { Grid, Modal, Stack } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import loop from "../../Images/History/loop_icon.png";
import warning from "../../Images/Home/warning_icon.png";
import addfile from "../../Images/Home/add_file.png";
// import loading from "../../Loading/Loading";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
  InputAdornment,
  TextField,
  Menu,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import kpi_img1 from "../../Images/Home/MRM KPI 1.png";
import kpi_img2 from "../../Images/Home/MRM KPI 2.png";
import kpi_img3 from "../../Images/Home/MRM KPI 3.png";
import kpi_img4 from "../../Images/Home/MRM KPI 4.png";
// import CreateMaterialRequest from "./Modal/CreateMaterialRequest";
import MaterialRequest from "./Model/MaterialRequest";

import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import dayjs from "dayjs";

const FONT = "Poppins, sans-serif";

// const dummyData = [
//   {
//     id: "MR-1023",
//     requestedby: "Vishnu",
//     numMaterials: 5,
//     requiredDate: "10 May 2026",
//     requestedOn: "28 April 2026",
//     handledBy: "Kannan",
//     level: null,
//     status: "Pending",
//   },
//   {
//     id: "MR-1028",
//     requestedby: "Vishnu",
//     numMaterials: 2,
//     requiredDate: "12 May 2026",
//     requestedOn: "4 April 2026",
//     handledBy: "Senthil",
//     level: "L2",
//     status: "Final Review",
//   },
//   {
//     id: "MR-1035",
//     requestedby: "Vishnu",
//     numMaterials: 5,
//     requiredDate: "10 May 2026",
//     requestedOn: "24 April 2026",
//     handledBy: "Kannan",
//     level: null,
//     status: "Approved",
//   },
//   {
//     id: "MR-1019",
//     requestedby: "Vishnu",
//     numMaterials: 4,
//     requiredDate: "5 May 2026",
//     requestedOn: "14 April 2026",
//     handledBy: "Kannan",
//     level: null,
//     status: "Approved",
//   },
//   {
//     id: "MR-1028",
//     requestedby: "Vishnu",
//     numMaterials: 3,
//     requiredDate: "20 May 2026",
//     requestedOn: "29 April 2026",
//     handledBy: "Senthil",
//     level: "L2",
//     status: "Rejected",
//   },
// ];

const statusConfig = {
  Pending: {
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
  },
  Fulfilled: {
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
  },
  Approved: {
    color: "#10b981",
    bg: "#ecfdf5",
    border: "#a7f3d0",
  },
  "L2 Rejected": {
    color: "#f43f5e",
    bg: "#fff1f2",
    border: "#fecdd3",
  },
};

const levelConfig = {
  L1: { color: "#6366f1", bg: "#eef2ff" },
  L2: { color: "#8b5cf6", bg: "#f5f3ff" },
};

const ALL_STATUSES = ["Fulfilled", "L2 Rejected"];

function StatusCell({ status, approved, rejected }) {
  const cfg = statusConfig[status] || statusConfig["L1 Review"];

  if (status === "L2 Mixed") {
    return (
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        justifyContaent="flex-end"
      >
        <Chip
          label="L2"
          size="small"
          sx={{
            height: 24,
            fontSize: "0.7rem",
            fontWeight: 500,
            fontFamily: "Poppins, sans-serif",
            bgcolor: cfg.bg,
            color: cfg.color,
            borderRadius: "15px",
            "& .MuiChip-label": { px: 1 },
          }}
        />
        <Chip
          icon={
            <CheckIcon
              sx={{ fontSize: "11px !important", color: "#059669 !important" }}
            />
          }
          label={approved}
          size="small"
          sx={{
            height: 24,
            fontSize: "0.7rem",
            fontWeight: 500,
            fontFamily: "Poppins, sans-serif",
            bgcolor: "#D1FAE5",
            color: "#059669",
            borderRadius: "15px",
            "& .MuiChip-label": { px: 0.5 },
          }}
        />
        <Chip
          icon={
            <CloseIcon
              sx={{ fontSize: "11px !important", color: "#DC2626 !important" }}
            />
          }
          label={rejected}
          size="small"
          sx={{
            height: 24,
            fontSize: "0.7rem",
            fontWeight: 500,
            fontFamily: "Poppins, sans-serif",
            bgcolor: "#FEE2E2",
            color: "#DC2626",
            borderRadius: "15px",
            "& .MuiChip-label": { px: 0.5 },
          }}
        />
      </Stack>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Chip
        label={status}
        size="small"
        sx={{
          height: 26,
          fontSize: "0.70rem",
          fontWeight: 500,
          fontFamily: "Poppins, sans-serif",
          bgcolor: cfg.bg,
          color: cfg.color,
          // border: `1px solid ${cfg.border}`,
          borderRadius: "15px",
          width: "100px",
          "& .MuiChip-label": { px: 1.5 },
        }}
      />
    </Box>
  );
}
function LevelBadge({ level }) {
  const cfg = levelConfig[level] || { color: "#555", bg: "#eee" };
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: cfg.bg,
        color: cfg.color,
        fontWeight: 600,
        fontSize: "0.72rem",
        ml: 1,
        flexShrink: 0,
      }}
    >
      {level}
    </Box>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxHeight: "95vh", // fixed height
  overflowY: "auto", // vertical scroll
  bgcolor: "background.paper",
  boxShadow: 24,
  px: 3,
  py: 4,
  borderRadius: "15px",
};

export default function History() {
  const [search, setSearch] = useState("");
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const handleFilterOpen = (e) => setFilterAnchor(e.currentTarget);
  const handleFilterClose = () => setFilterAnchor(null);
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedid, setSelectedid] = React.useState(null);
  //   const [reqDate, serReqDate] = React.useState(null);
  const [kpiData, setKpiData] = useState(null);
  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };
  const KpiData = async () => {
    const payload = {
      Id: sessionStorage.getItem("user_id"),
      Role: sessionStorage.getItem("role"),
    };
    await axios
      .post("http://10.10.0.101:8000/kpis/history", payload)
      .then((res) => {
        console.log(res.data);
        setKpiData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    KpiData();
  }, []);

  const cardData = [
    {
      count: kpiData?.data?.pendingRequests,
      title: "Pending L1",
      subtitle: "Awaiting Level 1 approval",
      color: "#6C63FF",
      bg: "#F5F3FF",
      image: kpi_img1,
      imagePosition: {
        bottom: 0,
        left: 0,
      },
    },
    {
      count: kpiData?.data?.awaitingFinalApproval,
      title: "Pending L2",
      subtitle: "Awaiting Level 2 approval",
      color: "#5B7CFA",
      bg: "#EEF4FF",
      image: kpi_img2,
      imagePosition: {
        bottom: 0,
        right: 0,
      },
    },
    {
      count: kpiData?.data?.rejectedRequests,
      title: "L2 Rejected",
      subtitle: "Rejected at Level 2",
      color: "#FF9800",
      bg: "#FFF7EC",
      image: kpi_img3,
      imagePosition: {
        bottom: 0,
        left: 0,
      },
    },
    {
      count: kpiData?.data?.approvedRequests,
      title: "Approved Requests",
      subtitle: "Successfully approved",
      color: "#18C5C8",
      bg: "#ECFCFC",
      image: kpi_img4,
      imagePosition: {
        bottom: 0,
        right: 0,
      },
    },
  ];

  const toggleStatus = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };
  const fetchTabledata = async () => {
    setLoading(true);
    const payload = {
      Id: sessionStorage.getItem("user_id"),
      Role: sessionStorage.getItem("role"),
    };

    await axios
      .post("http://10.10.0.101:8000/history/requests", payload)
      .then((res) => {
        console.log(res.data);
        const updatedRows = res.data.data.map((item) => ({
          ...item,
          Status_text:
            item.Status == "0"
              ? "L1 Review"
              : item.Status == "1"
                ? "L2 Review"
                : item.Status == "2"
                  ? "L1 Rejected"
                  : item.Status == "3"
                    ? "L2 Rejected"
                    : item.Status == "4"
                      ? "L2 Approved"
                      : item.Status == "5"
                        ? "Processing"
                        : item.Status == "6"
                          ? "Fulfilled"
                          : item.Cancelled == "7"
                            ? "Cancelled"
                            : item.Status,
        }));
        setLoading(false);
        setRows(updatedRows);
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.detail || err.detail || "Something went wrong";
        sessionStorage.setItem("errormessge", errorMessage);
      });
  };
  useEffect(() => {
    fetchTabledata();
  }, []);

  const filtered = rows.filter((row) => {
    const searchText = search.toLowerCase();

    const matchSearch =
      search === "" ||
      row.MaterialRequestId?.toLowerCase().includes(searchText) ||
      row.Requester?.toLowerCase().includes(searchText) ||
      row.HandledBy?.toLowerCase().includes(searchText) ||
      row.Status_text?.toLowerCase().includes(searchText);

    const matchStatus =
      selectedStatuses.length === 0 ||
      selectedStatuses.includes(row.Status_text);

    return matchSearch && matchStatus;
  });

  return (
    <div>
      <Navbar>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "center" }}
          spacing={3}
        >
          <Grid size={{ lg: 5, xs: 12, md: 12, sm: 12 }}>
            <Paper sx={{ padding: 2 }} elevation={0}>
              <Grid container spacing={2}>
                {cardData.map((item, index) => (
                  <Grid size={{ lg: 6, xs: 12, md: 12, sm: 12 }} key={index}>
                    {/* Full Image */}
                    <Box
                      sx={{
                        position: "relative",
                        width: 200,
                        height: 150,
                      }}
                    >
                      {/* Image */}
                      <Box
                        component="img"
                        src={item.image}
                        alt=""
                        sx={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          pointerEvents: "none",
                        }}
                      />

                      {/* Content inside image */}
                      <Box
                        sx={{
                          position: "relative",
                          zIndex: 2,
                          width: "100%",
                          height: "100%",
                          px: 3,
                          boxSizing: "border-box",
                        }}
                      >
                        {/* Count - Top 5 */}
                        <Typography
                          sx={{
                            position: "absolute",
                            top: 15,
                            left: 14,
                            fontSize: "28px",
                            fontWeight: 700,
                            color: item.color,
                            fontFamily: "Poppins, sans-serif",
                          }}
                        >
                          {item.count}
                        </Typography>

                        {/* Title - Center */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "43%",
                            transform: "translate(-50%, -50%)",
                            width: "70%",
                            display: "flex",
                            justifyContent: "left",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 500,
                              color: "#222",
                              textAlign: "left",
                              fontFamily: "Poppins, sans-serif",
                            }}
                          >
                            {item.title}
                          </Typography>
                        </Box>

                        {/* Subtitle - Bottom 5 */}
                        <Typography
                          sx={{
                            position: "absolute",
                            bottom: 18,
                            left: "48%",
                            transform: "translateX(-50%)",
                            width: "80%",
                            fontSize: "11px",
                            color: "#555",
                            fontStyle: "italic",
                            textAlign: "left",
                            fontFamily: "Poppins, sans-serif",
                            lineHeight: 1.2,
                          }}
                        >
                          {item.subtitle}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
          <Grid size={{ lg: 7, xs: 12, md: 12, sm: 12 }}>
            <img
              src={right_icon}
              alt="icon"
              style={{
                width: "100%",
                objectFit: "contain",
              }}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            py: { xs: 1, md: 3 },
            // maxWidth: 1100,
            mx: "auto",
            fontFamily: FONT,
            background: "#fff",
            borderRadius: 3,
            mt: 2,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#1a1a2e",
                fontSize: "1.4rem",
                fontFamily: FONT,
              }}
            >
              History of Request
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {/* Search */}
              <TextField
                size="small"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 18, color: "#9ca3af" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: 200,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    background: "#fff",
                    fontFamily: FONT,
                  },
                  "& input": { fontFamily: FONT },
                }}
              />

              {/* Filter */}
              <Button
                variant="outlined"
                size="small"
                onClick={handleFilterOpen}
                endIcon={<KeyboardArrowDownIcon />}
                startIcon={<FilterListIcon />}
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "0.85rem",
                  color: "#374151",
                  borderColor: "#d1d5db",
                  fontFamily: FONT,
                  "&:hover": {
                    borderColor: "#9ca3af",
                    background: "#f9fafb",
                  },
                }}
              >
                Filter
              </Button>
              <Menu
                anchorEl={filterAnchor}
                open={Boolean(filterAnchor)}
                onClose={handleFilterClose}
                PaperProps={{
                  sx: {
                    borderRadius: "10px",
                    minWidth: 180,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                  },
                }}
              >
                {ALL_STATUSES.map((s) => (
                  <MenuItem key={s} onClick={() => toggleStatus(s)} dense>
                    <Checkbox
                      checked={selectedStatuses.includes(s)}
                      size="small"
                      sx={{ p: 0.5 }}
                    />
                    <ListItemText
                      primary={s}
                      primaryTypographyProps={{
                        fontSize: "0.85rem",
                        fontFamily: FONT,
                      }}
                    />
                  </MenuItem>
                ))}
              </Menu>

              {/* New Request */}
              {/* <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  background: "#1e40af",
                  fontFamily: FONT,
                  "&:hover": { background: "#1d3a9a" },
                  px: 2,
                }}
                onClick={handleOpen}
              >
                New Request
              </Button> */}
            </Box>
          </Box>

          {/* Table */}
          <TableContainer
            // component={Paper}
            elevation={0}
            sx={{
              borderTop: "1px solid #E2E8F0",
              borderLeft: "1px solid #E2E8F0",
              borderRight: "1px solid #E2E8F0",
            }}
          >
            <Table
              sx={{
                "& .MuiTableCell-root": {
                  py: 1, // vertical padding
                  px: 1.5,
                },
              }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    "& .MuiTableCell-root": {
                      py: 2, // vertical padding
                    },
                  }}
                >
                  {[
                    "Material Request ID",
                    "Requested By",
                    "Number of Materials",
                    "Required Date",
                    "Requested On",
                    "Handled by",
                    "Status",
                  ].map((col) => (
                    <TableCell
                      key={col}
                      sx={{
                        fontWeight: 500,
                        fontSize: "0.8rem",

                        borderBottom: "1px solid #e5e7eb",
                        py: 1.5,
                        whiteSpace: "nowrap",
                        fontFamily: "Poppins",
                        textAlign: "center",
                      }}
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={100} align="center">
                      <Box
                        sx={{
                          minHeight: "50px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CircularProgress aria-label="Loading..." />
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={100} align="center">
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "12px",
                          color: "gray",
                        }}
                      >
                        No Data Found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((row, idx) => (
                    <TableRow
                      key={idx}
                      sx={{
                        "&:last-child td": { border: 0 },
                        "&:hover": { background: "#f8fafc" },
                        transition: "background 0.15s",
                      }}
                      onClick={() => handleRowClick(row)}
                    >
                      <TableCell
                        sx={{
                          fontSize: "0.76rem",
                          fontWeight: 500,
                          // color: "#111827",
                          borderBottom: "1px solid #f3f4f6",
                          textAlign: "center",
                          fontFamily: FONT,
                          py: 0,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {row.MaterialRequestId}
                          {/* <Box sx={{ display: "flex", gap: 1 }}>
                            {idx === 1 && (
                              <>
                                {" "}
                                <img
                                  height={20}
                                  width={20}
                                  cursor="Pointer"
                                  src={warning}
                                />
                                <img
                                  height={20}
                                  width={20}
                                  cursor="Pointer"
                                  src={loop}
                                />
                              </>
                            )}
                            {idx === 3 && (
                              <>
                                {" "}
                                <img
                                  height={20}
                                  width={20}
                                  cursor="Pointer"
                                  src={warning}
                                />
                              </>
                            )}
                            {idx === 4 && (
                              <>
                                {" "}
                                <img
                                  height={20}
                                  width={20}
                                  cursor="Pointer"
                                  src={warning}
                                />
                                <img
                                  height={20}
                                  width={20}
                                  cursor="Pointer"
                                  src={addfile}
                                />
                              </>
                            )}
                          </Box> */}
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.76rem",
                          // color: "#374151",
                          borderBottom: "1px solid #f3f4f6",
                          textAlign: "center",
                          pr: 6,
                          fontFamily: FONT,
                          py: 0,
                        }}
                      >
                        {row.Requester}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.76rem",
                          // color: "#374151",
                          borderBottom: "1px solid #f3f4f6",
                          textAlign: "right",
                          pr: 6,
                          fontFamily: FONT,
                          py: 0,
                        }}
                      >
                        {row.NumberOfMaterials}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.76rem",
                          // color: "#374151",
                          borderBottom: "1px solid #f3f4f6",
                          fontFamily: FONT,
                          textAlign: "center",
                          py: 0,
                        }}
                      >
                        {dayjs(row.RequiredDate).format("DD-MMM-YYYY")}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.76rem",
                          // color: "#374151",
                          borderBottom: "1px solid #f3f4f6",
                          fontFamily: FONT,
                          textAlign: "center",
                          py: 0,
                        }}
                      >
                        {dayjs(row.RequestedOn).format("DD-MMM-YYYY")}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.76rem",
                          // color: "#374151",
                          borderBottom: "1px solid #f3f4f6",
                          fontFamily: FONT,

                          py: 0,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "left",
                          }}
                        >
                          {row.HandledBy}
                          {row.level && <LevelBadge level={row.level} />}
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{ borderBottom: "1px solid #f3f4f6", py: 1 }}
                      >
                        <StatusCell status={row.Status_text} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ ...style, outline: "none" }}>
              <Grid
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  cursor: "pointer",
                }}
              >
                <CloseIcon
                  onClick={() => {
                    setOpen(false);
                  }}
                />
              </Grid>
              {/* <CreateMaterialRequest /> */}
              <MaterialRequest data={selectedRow} />
            </Box>
          </Modal>
        </div>
      </Navbar>
    </div>
  );
}
