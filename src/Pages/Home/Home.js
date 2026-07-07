import React, { useState } from "react";
import { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Stack,
  Divider,
  Grid,
  Modal,
  TablePagination,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ReplayIcon from "@mui/icons-material/Replay";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import CheckIcon from "@mui/icons-material/Check";
import right_icon from "../../Images/Home/Right_icon.png";
import addfile from "../../Images/Home/add_file.png";

import ClearIcon from "@mui/icons-material/Clear";

import kpi_img1 from "../../Images/Home/MRM KPI 1.png";
import kpi_img2 from "../../Images/Home/MRM KPI 2.png";
import kpi_img3 from "../../Images/Home/MRM KPI 3.png";
import kpi_img4 from "../../Images/Home/MRM KPI 4.png";
import CreateMaterialRequest from "./Modal/CreateMaterialRequest";
import { TextField, Menu, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Navbar from "../../Navbars/Navbar";
import ApproveMaterial from "./Modal/ApproveMaterial";
import L1RejectFirstModal from "./Modal/L1RejectFirstModal";
import L2RejectModal from "./Modal/L2RejectModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import warning from "../../Images/Home/warning_icon.png";
import loop from "../../Images/History/loop_icon.png";
import dayjs from "dayjs";
import Loading from "../../Loading/Loading";
const FONT = "Poppins, sans-serif";

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
  borderRadius: "10px",
  border: "none", // Border remove
  outline: "none", // Focus outline remove
};

const statusConfig = {
  "L2 Under Review": {
    bg: "#EFF6FF",
    color: "#2563EB",
    border: "#BFDBFE",
  },

  "L1 Review": {
    bg: "#FEEFDA",
    color: "#F99709",
    border: "#FDE68A",
  },

  "L1 Rejected": {
    bg: "#FBE3EA",
    color: "#E34472",
    border: "#FECACA",
  },

  "L2 Review": {
    bg: "#EBE9FD",
    color: "#7C6CF2",
    border: "#DDD6FE",
  },

  "L2 Approved": {
    bg: "#DCF7F7",
    color: "#16C8C7",
    border: "#A7F3D0",
  },

  "L2 Partial Approved": {
    bg: "#F3E8FF",
    color: "#9333EA",
    border: "#DDD6FE",
  },

  "L2 Rejected": {
    bg: "#FBE3EA",
    color: "#E34472",
    border: "#FECACA",
  },

  "L2 Mixed": {
    bg: "#E8EDFF",
    color: "#7C3AED",
    border: "#DDD6FE",
  },
};

function BadgeIcon({ type }) {
  if (type === "Critical")
    return (
      // <Tooltip title="Critical">
      <img height={20} width={20} cursor="Pointer" src={warning} />
      // </Tooltip>
    );
  if (type === "resubmitted")
    return (
      <Tooltip title="Resubmitted">
        <img height={20} width={20} cursor="Pointer" src={warning} />
      </Tooltip>
    );
  // if (type === "New")
  //   return (
  //     <Chip
  //       label='New'
  //       size='small'
  //       sx={{
  //         height: 20,
  //         fontSize: "0.6rem",
  //         fontWeight: 500,
  //         fontFamily: "Poppins, sans-serif",
  //         bgcolor: "#DBEAFE",
  //         color: "#2563EB",
  //         borderRadius: "10px",
  //         "& .MuiChip-label": { px: 1 },
  //       }}
  //     />
  //   );
  return null;
}

function StatusCell({ status, approved, rejected }) {
  const cfg = statusConfig[status] || statusConfig["L1 Review"];

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
          width: "120px",
          "& .MuiChip-label": { px: 1.5 },
        }}
      />
    </Box>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [approveModal, setApproveModal] = useState(false);
  const [modalName, setModalName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showSearch, setShowSearch] = useState(false);
  const [passRowData, setPassRowData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [l1ReSubmit, setL1Resubmit] = useState(null);
  const [kpiData, setKpiData] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const KpiData = async () => {
    setLoading(true);
    const payload = {
      Id: sessionStorage.getItem("user_id"),
      Role: sessionStorage.getItem("role"),
    };
    await axios
      .post("http://10.10.0.101:8000/kpis/home", payload)
      .then((res) => {
        console.log(res.data);
        setKpiData(res.data);
        fetchTabledata();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTabledata = async () => {
    const payload = {
      Id: sessionStorage.getItem("user_id"),
      Role: sessionStorage.getItem("role"),
    };

    await axios
      .post("http://10.10.0.101:8000/home", payload)
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
                        ? "L2 Partial Approved"
                        : item.Status == "6"
                          ? "Fulfilled"
                          : item.Status == "7"
                            ? "Cancelled"
                            : item.Status == "8"
                              ? "L2 Under Review"
                              : item.Status,
        }));

        setRows(updatedRows);

        setTabs([
          { label: "All", count: res.data.counts.total },
          { label: "Critical", count: res.data.counts.critical },
          { label: "New", count: res.data.counts.new },
          { label: "Normal", count: res.data.counts.normal },
          { label: "Resubmitted", count: res.data.counts.resubmitted },
        ]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // Runs whether API succeeds or fails
        setLoading(false);
      });
  };

  useEffect(() => {
    KpiData();
  }, []);

  const cardData = [
    {
      count: kpiData?.data?.pendingRequests,
      title: "Pending L1 Approval",
      subtitle: "Awaiting initial review",
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
      title: "Pending L2 Approval",
      subtitle: "Awaiting final review",
      color: "#5B7CFA",
      bg: "#EEF4FF",
      image: kpi_img2,
      imagePosition: {
        bottom: 0,
        right: 0,
      },
    },
    {
      count: kpiData?.data?.returnedByL1,
      title: "Rejected by L1",
      subtitle: "Rejected during initial review",
      color: "#FF9800",
      bg: "#FFF7EC",
      image: kpi_img3,
      imagePosition: {
        bottom: 0,
        left: 0,
      },
    },
    {
      count: kpiData?.data?.returnedByL2,
      title: "Rejected by L2",
      subtitle: "Rejected during final review",
      color: "#18C5C8",
      bg: "#ECFCFC",
      image: kpi_img4,
      imagePosition: {
        bottom: 0,
        right: 0,
      },
    },
  ];

  const filteredRows = rows.filter((row) => {
    let tabMatch = true;

    switch (activeTab) {
      case 1:
        tabMatch = row.CriticalStatus?.includes("Critical");
        break;
      case 2:
        tabMatch = row.CriticalStatus?.includes("New");
        break;
      case 3:
        tabMatch = row.CriticalStatus?.includes("Normal");
        break;
      case 4:
        tabMatch = row.Resubmitted === true;
        break;
      default:
        tabMatch = true;
    }

    const searchMatch =
      !searchText ||
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchText.toLowerCase()),
      );

    const statusMatch =
      statusFilter === "All" || row.Status_text === statusFilter;

    return tabMatch && searchMatch && statusMatch;
  });

  const loadingTrue = () => {
    setLoading(true);
  };

  const loadingFalse = () => {
    setLoading(false);
    setApproveModal(false);
    KpiData();
  };

  const openCreateMateralRequestModal = (Status, MaterialRequestId, level) => {
    setOpen(true);
    setApproveModal(false);
    setL1Resubmit({
      MaterialRequestId: MaterialRequestId,
      Status: Status,
      level: level,
    });
  };

  const CancelResubmit = () => {
    setL1Resubmit(null);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Navbar>
          <Grid
            container
            sx={{ display: "flex", justifyContent: "center" }}
            spacing={3}
          >
            <Grid size={{ lg: 5, xs: 12, md: 12, sm: 12 }}>
              <Paper sx={{ padding: 2 }} elevation={0}>
                <Grid container spacing={2} rowGap={1}>
                  {cardData.map((item, index) => (
                    <Grid size={{ lg: 6, xs: 12, md: 12, sm: 12 }} key={index}>
                      {/* Full Image */}
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
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
                            objectFit: "fill",
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
                              left: "38%",
                              transform: "translateX(-50%)",
                              // width: "100%",
                              maxWidth: "80%",
                              fontSize: "11px",
                              color: "#555",
                              fontStyle: "italic",
                              textAlign: "left",
                              fontFamily: "Poppins, sans-serif",
                              lineHeight: 1.2,
                              // border: "1px solid red",
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

          <Box>
            <Grid
              sx={{
                mt: 2,
                background: "#fff",
                // borderRadius: "16px",
                // border: "1px solid #E2E8F0",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 3,
                  py: 2.5,
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="#0F172A"
                  sx={{ fontSize: "1.1rem", fontFamily: "Poppins, sans-serif" }}
                >
                  Request Center
                </Typography>

                {/* Tabs */}
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {tabs.map((tab, i) => (
                    <Box
                      key={i}
                      onClick={() => setActiveTab(i)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                        px: 1.5,
                        py: 0.75,
                        borderRadius: "8px",
                        cursor: "pointer",
                        bgcolor: activeTab === i ? "#DBEAFE" : "transparent",
                        border:
                          activeTab === i
                            ? "1px solid #BFDBFE"
                            : "1px solid transparent",
                        transition: "all 0.15s",
                        "&:hover": { bgcolor: "#F0F9FF" },
                      }}
                    >
                      <Box
                        sx={{ color: activeTab === i ? "#2563EB" : "#94A3B8" }}
                      >
                        {tab.icon}
                      </Box>
                      <Typography
                        variant="body2"
                        fontWeight={activeTab === i ? 700 : 500}
                        color={activeTab === i ? "#2563EB" : "#64748B"}
                        sx={{
                          fontSize: "0.70rem",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        {tab.label}
                      </Typography>
                      <Box
                        sx={{
                          bgcolor: activeTab === i ? "#2563EB" : "#E2E8F0",
                          color: activeTab === i ? "#fff" : "#64748B",
                          borderRadius: "4px",
                          px: 0.6,
                          py: 0.1,
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          fontFamily: "Poppins, sans-serif",
                          minWidth: 20,
                          textAlign: "center",
                        }}
                      >
                        {tab.count}
                      </Box>
                    </Box>
                  ))}
                </Stack>

                {/* Actions */}
                <Stack direction="row" spacing={1} alignItems="center">
                  {showSearch && (
                    <Box sx={{ p: 1 }}>
                      <TextField
                        size="small"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => {
                          setSearchText(e.target.value);
                          setPage(0);
                        }}
                        sx={{
                          width: "140px",
                          "& .MuiOutlinedInput-root": {
                            height: "28px",
                            borderRadius: "6px",
                            fontSize: "0.7rem",
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "4px 8px",
                          },
                        }}
                      />
                    </Box>
                  )}
                  <IconButton
                    size="small"
                    onClick={() => setShowSearch(!showSearch)}
                    sx={{
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                      p: 0.75,
                    }}
                  >
                    <SearchIcon sx={{ fontSize: 18, color: "#64748B" }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    sx={{
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                      p: 0.75,
                    }}
                  >
                    <FilterListIcon sx={{ fontSize: 18, color: "#64748B" }} />
                  </IconButton>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    size="small"
                    sx={{
                      bgcolor: "#2563EB",
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.70rem",
                      fontFamily: "Poppins, sans-serif",
                      px: 2,
                      py: 0.875,
                      boxShadow: "none",
                      "&:hover": { bgcolor: "#1D4ED8", boxShadow: "none" },
                    }}
                    onClick={() => {
                      setOpen(true);
                      setL1Resubmit(false);
                    }}
                  >
                    New Request
                  </Button>
                </Stack>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                  sx: {
                    minWidth: 160,
                    borderRadius: "8px",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                    "& .MuiMenuItem-root": {
                      minHeight: "30px",
                      fontSize: "0.75rem",
                      fontFamily: "Poppins, sans-serif",
                      py: 0.5,
                      px: 1.5,
                    },
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    setStatusFilter("All");
                    setAnchorEl(null);
                  }}
                >
                  All Statuses
                </MenuItem>

                {[
                  "L1 Review",
                  "L2 Review",
                  "L2 Under Review",
                  "L1 Rejected",
                  "L2 Rejected",
                  "L2 Approved",
                  "L2 Partial Approved",
                ].map((status) => (
                  <MenuItem
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setAnchorEl(null);
                    }}
                  >
                    {status}
                  </MenuItem>
                ))}
              </Menu>
              <Divider />
              {/* Table */}
              <TableContainer
                sx={{
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
                    <TableRow>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "0.8rem",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Material Request ID
                      </TableCell>
                      {sessionStorage.getItem("role") == "L1_APPROVER" && (
                        <TableCell
                          align="left"
                          sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "0.8rem",
                          }}
                        >
                          Requester
                        </TableCell>
                      )}

                      <TableCell
                        align="right"
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "0.8rem",

                          whiteSpace: "nowrap",
                        }}
                      >
                        Number of Materials
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "0.8rem",

                          whiteSpace: "nowrap",
                        }}
                      >
                        Requested On
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "0.8rem",

                          whiteSpace: "nowrap",
                        }}
                      >
                        Required Date
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "0.8rem",
                        }}
                      >
                        Handled by
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "0.8rem",

                          whiteSpace: "nowrap",
                        }}
                      >
                        Reference No
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Poppins, sans-serif",

                          fontSize: "0.8rem",
                        }}
                      >
                        Material Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRows.length > 0 ? (
                      filteredRows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                        .map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              "&:hover": { bgcolor: "#F8FAFC" },
                              transition: "background 0.1s",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              if (
                                sessionStorage.getItem("role") == "L1_APPROVER"
                              ) {
                                setApproveModal(true);

                                if (row.Status_text == "L1 Review") {
                                  setModalName("ApproveModal");
                                  setPassRowData(row);
                                } else if (row.Status_text == "L2 Review") {
                                  setModalName("ApproveModal");
                                  setPassRowData(row);
                                } else if (row.Status_text == "L1 Rejected") {
                                  setModalName("L1RejectFirstModal");
                                  setPassRowData(row);
                                } else if (
                                  row.Status_text == "L2 Under Review" ||
                                  row.Status_text == "L2 Partial Approved" ||
                                  row.Status_text == "L2 Approved" ||
                                  row.Status_text == "L2 Rejected"
                                ) {
                                  setModalName("L2RejectModal");
                                  setPassRowData(row);
                                } else {
                                  setModalName("");
                                }
                              } else {
                                setApproveModal(true);
                                if (row.Status_text == "L1 Rejected") {
                                  setModalName("L1RejectFirstModal");
                                  setPassRowData(row);
                                } else if (
                                  row.Status_text == "L2 Under Review" ||
                                  row.Status_text == "L2 Partial Approved" ||
                                  row.Status_text == "L2 Approved" ||
                                  row.Status_text == "L2 Rejected" ||
                                  row.Status_text == "L1 Review"
                                ) {
                                  setModalName("L2RejectModal");
                                  setPassRowData(row);
                                }
                              }
                            }}
                          >
                            {/* ID + Badges */}
                            <TableCell>
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                              >
                                <Typography
                                  fontWeight={500}
                                  fontSize="0.70rem"
                                  color="#1E293B"
                                  sx={{
                                    fontFamily: "Poppins, sans-serif",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {row.MaterialRequestId}
                                </Typography>
                                {row.CriticalStatus.map((b, i) => (
                                  <BadgeIcon key={i} type={b} />
                                ))}
                                {row.Resubmitted ? (
                                  <img
                                    src={loop}
                                    alt="Resubmitted"
                                    style={{ width: "20px" }}
                                  />
                                ) : null}
                                {row.CriticalStatus?.includes("New") ? (
                                  <img
                                    src={addfile}
                                    alt="Resubmitted"
                                    style={{ width: "20px" }}
                                  />
                                ) : (
                                  ""
                                )}
                              </Stack>
                            </TableCell>

                            {sessionStorage.getItem("role") ==
                              "L1_APPROVER" && (
                              <>
                                {/* Requester */}
                                <TableCell
                                  sx={{
                                    fontFamily: "Poppins, sans-serif",
                                    fontSize: "0.76rem",
                                    textAlign: "left",
                                  }}
                                >
                                  {row.Requester}
                                </TableCell>
                              </>
                            )}

                            {/* Materials */}
                            <TableCell
                              align="right"
                              sx={{
                                fontFamily: "Poppins, sans-serif",
                              }}
                            >
                              <Typography
                                fontWeight={500}
                                sx={{
                                  fontFamily: "Poppins, sans-serif",
                                  fontSize: "0.76rem",
                                }}
                              >
                                {row.NumberOfMaterials}
                              </Typography>
                            </TableCell>

                            {/* Requested On */}
                            <TableCell
                              sx={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "0.76rem",
                              }}
                            >
                              {dayjs(row.RequestedOn).format("DD-MMM-YYYY")}
                            </TableCell>

                            {/* Required Date */}
                            <TableCell
                              sx={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "0.76rem",
                              }}
                            >
                              {dayjs(row.RequiredDate).format("DD-MMM-YYYY")}
                            </TableCell>

                            {/* Handled By + Level */}
                            <TableCell
                              sx={{ fontFamily: "Poppins, sans-serif" }}
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                              >
                                <Typography
                                  sx={{
                                    fontFamily: "Poppins, sans-serif",
                                    fontSize: "0.76rem",
                                  }}
                                >
                                  {row.HandledBy}
                                </Typography>
                                {/* <Chip
                              label={row.level}
                              size='small'
                              sx={{
                                height: 22,
                                fontSize: "0.70rem",
                                fontWeight: 700,
                                fontFamily: "Poppins, sans-serif",
                                // bgcolor: levelConfig[row.level].bg,
                                // color: levelConfig[row.level].color,
                                borderRadius: "6px",
                                "& .MuiChip-label": { px: 1 },
                              }}
                            /> */}
                              </Stack>
                            </TableCell>

                            {/* Ref No */}
                            <TableCell>
                              <Typography
                                // color={
                                //   row.ReferenceNo === "-" ? "#94A3B8" : "#1E293B"
                                // }
                                sx={{
                                  fontFamily: "Poppins, sans-serif",
                                  fontSize: "0.76rem",
                                  textAlign: "left",
                                }}
                              >
                                {row.ReferenceNo == "" ? "-" : row.ReferenceNo}
                              </Typography>
                            </TableCell>

                            <TableCell sx={{ textAlign: "center" }}>
                              {row.Status == "5" ? (
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="center"
                                  spacing={0.75}
                                  sx={{
                                    display: "inline-flex",
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: "16px",
                                    bgcolor: "#E8EDFF",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      color: "#6787FF",
                                      fontSize: "0.7rem",
                                      fontWeight: 600,
                                      fontFamily: "Poppins, sans-serif",
                                    }}
                                  >
                                    L2
                                  </Typography>

                                  <Chip
                                    icon={<CheckIcon />}
                                    label={row.acceptedCount}
                                    size="small"
                                    sx={{
                                      height: 20,
                                      fontSize: "0.65rem",
                                      bgcolor: "#DCF7F7",
                                      color: "#16C8C7",

                                      "& .MuiChip-icon": {
                                        color: "#16C8C7",
                                        fontSize: 12,
                                        ml: 0.5,
                                      },
                                      "& .MuiChip-label": {
                                        px: 0.75,
                                      },
                                    }}
                                  />

                                  <Chip
                                    icon={<ClearIcon />}
                                    label={row.rejectedCount}
                                    size="small"
                                    sx={{
                                      height: 20,
                                      fontSize: "0.65rem",
                                      bgcolor: "#FBE3EA",
                                      color: "#E34472",

                                      "& .MuiChip-icon": {
                                        color: "#E34472",
                                        fontSize: 12,
                                        ml: 0.5,
                                      },
                                      "& .MuiChip-label": {
                                        px: 0.75,
                                      },
                                    }}
                                  />
                                </Stack>
                              ) : (
                                <StatusCell status={row.Status_text} />
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={
                            sessionStorage.getItem("role") === "L1_APPROVER"
                              ? 8
                              : 7
                          }
                          align="center"
                          sx={{
                            py: 4,
                            color: "#64748B",
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "0.85rem",
                          }}
                        >
                          No Data Found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  count={filteredRows.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 20, 50]}
                  sx={{
                    border: "1px solid #E2E8F0",
                    borderTop: "none",
                    fontFamily: "Poppins, sans-serif",
                    "& .MuiTablePagination-toolbar": {
                      fontFamily: "Poppins, sans-serif",
                      minHeight: 52,
                    },
                    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                      {
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.8rem",
                      },
                    "& .MuiTablePagination-select": {
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "0.8rem",
                    },
                  }}
                />
              </TableContainer>
            </Grid>
          </Box>

          <div>
            <Modal
              open={approveModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {modalName == "ApproveModal" ? (
                  <ApproveMaterial
                    rowData={passRowData}
                    loadingTrue={loadingTrue}
                    loadingFalse={loadingFalse}
                  />
                ) : modalName == "L1RejectFirstModal" ? (
                  <L1RejectFirstModal
                    rowData={passRowData}
                    loadingTrue={loadingTrue}
                    loadingFalse={loadingFalse}
                    openCreateMateralRequestModal={
                      openCreateMateralRequestModal
                    }
                  />
                ) : modalName == "L2RejectModal" ? (
                  <L2RejectModal
                    rowData={passRowData}
                    loadingTrue={loadingTrue}
                    loadingFalse={loadingFalse}
                    openCreateMateralRequestModal={
                      openCreateMateralRequestModal
                    }
                  />
                ) : (
                  ""
                )}
              </Box>
            </Modal>
          </div>

          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <CreateMaterialRequest
                  loadingTrue={loadingTrue}
                  loadingFalse={loadingFalse}
                  l1ReSubmit={l1ReSubmit}
                  CancelResubmit={CancelResubmit}
                  KpiData={KpiData}
                  handleClose={handleClose}
                />
              </Box>
            </Modal>
          </div>
        </Navbar>
      )}
    </div>
  );
}
