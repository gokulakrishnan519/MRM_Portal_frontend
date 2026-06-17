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

import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

import kpi_img1 from "../../Images/Home/MRM KPI 1.png";
import kpi_img2 from "../../Images/Home/MRM KPI 2.png";
import kpi_img3 from "../../Images/Home/MRM KPI 3.png";
import kpi_img4 from "../../Images/Home/MRM KPI 4.png";
import CreateMaterialRequest from "./Modal/CreateMaterialRequest";

import CloseIcon from "@mui/icons-material/Close";
import Navbar from "../../Navbars/Navbar";
import ApproveMaterial from "./Modal/ApproveMaterial";
import L1RejectFirstModal from "./Modal/L1RejectFirstModal";
import L2RejectModal from "./Modal/L2RejectModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import warning from "../../Images/Home/warning_icon.png";
import loop from "../../Images/History/loop_icon.png";
const FONT = "Poppins, sans-serif";

const cardData = [
  {
    count: "03",
    title: "Pending Requests",
    subtitle: "Awaiting approval",
    color: "#6C63FF",
    bg: "#F5F3FF",
    image: kpi_img1,
    imagePosition: {
      bottom: 0,
      left: 0,
    },
  },
  {
    count: "02",
    title: "Awaiting Final Approval",
    subtitle: "Pending higher-level approval",
    color: "#5B7CFA",
    bg: "#EEF4FF",
    image: kpi_img2,
    imagePosition: {
      bottom: 0,
      right: 0,
    },
  },
  {
    count: "12",
    title: "Rejected Requests",
    subtitle: "I need your action",
    color: "#FF9800",
    bg: "#FFF7EC",
    image: kpi_img3,
    imagePosition: {
      bottom: 0,
      left: 0,
    },
  },
  {
    count: "04",
    title: "Approved Requests",
    subtitle: "Approved and moved to next stage",
    color: "#18C5C8",
    bg: "#ECFCFC",
    image: kpi_img4,
    imagePosition: {
      bottom: 0,
      right: 0,
    },
  },
];

const dummyData = [
  {
    id: "MR-1023",
    numMaterials: 5,
    requiredDate: "10 May 2026",
    requestedOn: "24 April 2026",
    handledBy: "Kannan",
    level: null,
    status: "Pending",
  },
  {
    id: "MR-1028",
    numMaterials: 2,
    requiredDate: "10 May 2026",
    requestedOn: "24 April 2026",
    handledBy: "Senthil",
    level: "L2",
    status: "Final Review",
  },
  {
    id: "MR-1035",
    numMaterials: 5,
    requiredDate: "10 May 2026",
    requestedOn: "24 April 2026",
    handledBy: "Kannan",
    level: null,
    status: "Approved",
  },
  {
    id: "MR-1019",
    numMaterials: 4,
    requiredDate: "10 May 2026",
    requestedOn: "24 April 2026",
    handledBy: "Kannan",
    level: null,
    status: "Approved",
  },
  {
    id: "MR-1028",
    numMaterials: 3,
    requiredDate: "10 May 2026",
    requestedOn: "24 April 2026",
    handledBy: "Senthil",
    level: "L2",
    status: "Rejected",
  },
];

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
  "L1 Review": { bg: "#FEEFDA", color: "#F99709", border: "#FDE68A" },
  "L1 Rejected": { bg: "#FBE3EA", color: "#E34472", border: "#FECACA" },
  "L2 Review": { bg: "#EBE9FD", color: "#7C6CF2", border: "#DDD6FE" },
  "L2 Approved": { bg: "#DCF7F7", color: "#16C8C7", border: "#A7F3D0" },
  "L2 Mixed": { bg: "#E8EDFF", color: "#7C3AED", border: "#DDD6FE" },
};

function BadgeIcon({ type }) {
  if (type === "Critical")
    return (
      // <Tooltip title="Critical">
      <img height={20} width={20} cursor='Pointer' src={warning} />
      // </Tooltip>
    );
  if (type === "resubmitted")
    return (
      <Tooltip title='Resubmitted'>
        <img height={20} width={20} cursor='Pointer' src={warning} />
      </Tooltip>
    );
  if (type === "New")
    return (
      <Chip
        label='New(A)'
        size='small'
        sx={{
          height: 20,
          fontSize: "0.6rem",
          fontWeight: 500,
          fontFamily: "Poppins, sans-serif",
          bgcolor: "#DBEAFE",
          color: "#2563EB",
          borderRadius: "10px",
          "& .MuiChip-label": { px: 1 },
        }}
      />
    );
  return null;
}

function StatusCell({ status, approved, rejected }) {
  const cfg = statusConfig[status] || statusConfig["L1 Review"];

  if (status === "L2 Mixed") {
    return (
      <Stack
        direction='row'
        spacing={0.5}
        alignItems='center'
        justifyContaent='flex-end'
      >
        <Chip
          label='L2'
          size='small'
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
          size='small'
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
          size='small'
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
        size='small'
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

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [approveModal, setApproveModal] = useState(false);
  const [modalName, setModalName] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigate = useNavigate();
  const handleClose = () => setOpen(false);

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
          Status:
            item.Status === "pending_l1"
              ? "L1 Review"
              : item.Status === "pending_l2"
                ? "L2 Review"
                : item.Status === "approved"
                  ? "L2 Approved"
                  : item.Status === "l1_rejected"
                    ? "L1 Rejected"
                    : item.Status === "l2_rejected"
                      ? "L2 Rejected"
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
      });
  };

  const filteredRows = rows.filter((row) => {
    switch (activeTab) {
      case 1:
        return row.CriticalStatus?.includes("Critical");
      case 2:
        return row.CriticalStatus?.includes("New");
      case 3:
        return row.CriticalStatus?.includes("Normal");
      case 4:
        return row.Resubmitted;
      default:
        return true;
    }
  });

  useEffect(() => {
    fetchTabledata();
  }, []);
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
                        component='img'
                        src={item.image}
                        alt=''
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
              alt='icon'
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
                variant='h6'
                fontWeight={700}
                color='#0F172A'
                sx={{ fontSize: "1.1rem", fontFamily: "Poppins, sans-serif" }}
              >
                Request Center
              </Typography>

              {/* Tabs */}
              <Stack direction='row' spacing={1} flexWrap='wrap'>
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
                      variant='body2'
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
              <Stack direction='row' spacing={1} alignItems='center'>
                <IconButton
                  size='small'
                  sx={{
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    p: 0.75,
                  }}
                >
                  <SearchIcon sx={{ fontSize: 18, color: "#64748B" }} />
                </IconButton>
                <IconButton
                  size='small'
                  sx={{
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    p: 0.75,
                  }}
                >
                  <FilterListIcon sx={{ fontSize: 18, color: "#64748B" }} />
                </IconButton>
                <Button
                  variant='contained'
                  startIcon={<AddIcon />}
                  size='small'
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
                  }}
                >
                  New Request
                </Button>
              </Stack>
            </Box>

            <Divider />

            {/* Table */}
            <TableContainer
              sx={{
                borderLeft: "1px solid #E2E8F0",
                borderRight: "1px solid #E2E8F0",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.8rem",
                      }}
                    >
                      Material Request ID
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.8rem",
                        textAlign: "center",
                      }}
                    >
                      Requester
                      <Typography
                        component='span'
                        sx={{
                          color: "#DC2626",
                          fontWeight: 600,
                          ml: 0.5,
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "0.8rem",
                          textAlign: "center",
                        }}
                      >
                        (Approver)
                      </Typography>
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.8rem",
                        textAlign: "center",
                      }}
                    >
                      Number of Materials
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.8rem",
                        textAlign: "center",
                      }}
                    >
                      Requested On
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.8rem",
                        textAlign: "center",
                      }}
                    >
                      Required Date
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.8rem",
                        textAlign: "center",
                      }}
                    >
                      Handled by
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "0.8rem",
                        textAlign: "center",
                      }}
                    >
                      Reference No.
                    </TableCell>
                    <TableCell
                      // align="right"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        textAlign: "center",
                        fontSize: "0.8rem",
                      }}
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:hover": { bgcolor: "#F8FAFC" },
                          transition: "background 0.1s",
                        }}
                        onClick={() => {
                          setApproveModal(true);

                          if (row.status == "L1 Review") {
                            setModalName("ApproveModal");
                          } else if (row.status == "L1 Rejected") {
                            setModalName("L1RejectFirstModal");
                          } else if (row.status == "L2 Mixed") {
                            setModalName("L2RejectModal");
                          } else {
                            setModalName("");
                          }
                        }}
                      >
                        {/* ID + Badges */}
                        <TableCell>
                          <Stack
                            direction='row'
                            alignItems='center'
                            spacing={1}
                          >
                            <Typography
                              fontWeight={600}
                              fontSize='0.70rem'
                              color='#1E293B'
                              sx={{ fontFamily: "Poppins, sans-serif" }}
                            >
                              {row.MaterialRequestId}
                            </Typography>
                            {row.CriticalStatus.map((b, i) => (
                              <BadgeIcon key={i} type={b} />
                            ))}
                            {row.Resubmitted ? (
                              <img src={loop} alt='Resubmitted' />
                            ) : null}
                          </Stack>
                        </TableCell>

                        {/* Requester */}
                        <TableCell
                          sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "0.70rem",
                            textAlign: "center",
                          }}
                        >
                          {row.Requester}
                        </TableCell>

                        {/* Materials */}
                        <TableCell
                          align='center'
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
                          {row.RequestedOn}
                        </TableCell>

                        {/* Required Date */}
                        <TableCell
                          sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "0.76rem",
                          }}
                        >
                          {row.RequiredDate}
                        </TableCell>

                        {/* Handled By + Level */}
                        <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                          <Stack
                            direction='row'
                            alignItems='center'
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
                            <Chip
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
                            />
                          </Stack>
                        </TableCell>

                        {/* Ref No */}
                        <TableCell>
                          <Typography
                            color={row.refNo === "-" ? "#94A3B8" : "#1E293B"}
                            sx={{
                              fontFamily: "Poppins, sans-serif",
                              fontSize: "0.76rem",
                              textAlign: "center",
                            }}
                          >
                            {row.ReferenceNo}
                          </Typography>
                        </TableCell>

                        {/* Status */}
                        <TableCell sx={{ textAlign: "center" }}>
                          <StatusCell
                            status={row.Status}
                            // approved={row.approved}
                            // rejected={row.rejected}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                component='div'
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
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
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
                    setApproveModal(false);
                  }}
                />
              </Grid>

              {modalName == "ApproveModal" ? (
                <ApproveMaterial />
              ) : modalName == "L1RejectFirstModal" ? (
                <L1RejectFirstModal />
              ) : modalName == "L2RejectModal" ? (
                <L2RejectModal />
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
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
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

              <CreateMaterialRequest />
            </Box>
          </Modal>
        </div>
      </Navbar>
    </div>
  );
}
