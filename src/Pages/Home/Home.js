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

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxHeight: "95vh", // fixed height
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  px: 3,
  py: 2,
  borderRadius: "10px",
  border: "none", // Border remove
  outline: "none", // Focus outline remove
};

const rows = [
  {
    id: "MR-1023",
    badges: ["new"],
    requester: "Vishnu",
    materials: 5,
    requestedOn: "10 May 2026",
    requiredDate: "24 April 2026",
    handledBy: "Kannan",
    level: "L1",
    refNo: "-",
    status: "L1 Review",
  },
  {
    id: "MR-1028",
    badges: ["critical", "resubmitted", "new"],
    requester: "Vishnu",
    materials: 5,
    requestedOn: "10 May 2026",
    requiredDate: "24 April 2026",
    handledBy: "Kannan",
    level: "L1",
    refNo: "-",
    status: "L1 Review",
  },
  {
    id: "MR-1035",
    badges: [],
    requester: "Vishnu",
    materials: 5,
    requestedOn: "10 May 2026",
    requiredDate: "24 April 2026",
    handledBy: "Kannan",
    level: "L1",
    refNo: "-",
    status: "L1 Rejected",
  },
  {
    id: "MR-1019",
    badges: ["critical"],
    requester: "Vishnu",
    materials: 4,
    requestedOn: "10 May 2026",
    requiredDate: "24 April 2026",
    handledBy: "Senthil",
    level: "L2",
    refNo: "-",
    status: "L2 Review",
  },
  {
    id: "MR-1020",
    badges: ["critical", "new"],
    requester: "Vishnu",
    materials: 3,
    requestedOn: "10 May 2026",
    requiredDate: "24 April 2026",
    handledBy: "Kannan",
    level: "L1",
    refNo: "-",
    status: "L1 Rejected",
  },
  {
    id: "MR-1024",
    badges: ["critical", "resubmitted"],
    requester: "Vishnu",
    materials: 3,
    requestedOn: "10 May 2026",
    requiredDate: "24 April 2026",
    handledBy: "Senthil",
    level: "L2",
    refNo: "MJ-233",
    status: "L2 Approved",
  },
  {
    id: "MR-1022",
    badges: ["critical", "new"],
    requester: "Vishnu",
    materials: 3,
    requestedOn: "10 May 2026",
    requiredDate: "24 April 2026",
    handledBy: "Senthil",
    level: "L2",
    refNo: "PR-109, MJ-234",
    status: "L2 Mixed",
    approved: 2,
    rejected: 2,
  },
];

const statusConfig = {
  "L1 Review": { bg: "#FEF3C7", color: "#D97706", border: "#FDE68A" },
  "L1 Rejected": { bg: "#FEE2E2", color: "#DC2626", border: "#FECACA" },
  "L2 Review": { bg: "#EDE9FE", color: "#7C3AED", border: "#DDD6FE" },
  "L2 Approved": { bg: "#D1FAE5", color: "#059669", border: "#A7F3D0" },
  "L2 Mixed": { bg: "#EDE9FE", color: "#7C3AED", border: "#DDD6FE" },
};

const levelConfig = {
  L1: { bg: "#DBEAFE", color: "#2563EB" },
  L2: { bg: "#E0E7FF", color: "#4F46E5" },
};

function BadgeIcon({ type }) {
  if (type === "critical")
    return (
      <Tooltip title='Critical'>
        <WarningAmberIcon sx={{ fontSize: 16, color: "#F59E0B" }} />
      </Tooltip>
    );
  if (type === "resubmitted")
    return (
      <Tooltip title='Resubmitted'>
        <ReplayIcon sx={{ fontSize: 16, color: "#60A5FA" }} />
      </Tooltip>
    );
  if (type === "new")
    return (
      <Chip
        label='New(A)'
        size='small'
        sx={{
          height: 22,
          fontSize: "0.7rem",
          fontWeight: 700,
          fontFamily: "Poppins, sans-serif",
          bgcolor: "#DBEAFE",
          color: "#2563EB",
          borderRadius: "6px",
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
        justifyContent='flex-end'
      >
        <Chip
          label='L2'
          size='small'
          sx={{
            height: 24,
            fontSize: "0.7rem",
            fontWeight: 700,
            fontFamily: "Poppins, sans-serif",
            bgcolor: cfg.bg,
            color: cfg.color,
            borderRadius: "6px",
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
            fontWeight: 700,
            fontFamily: "Poppins, sans-serif",
            bgcolor: "#D1FAE5",
            color: "#059669",
            borderRadius: "6px",
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
            fontWeight: 700,
            fontFamily: "Poppins, sans-serif",
            bgcolor: "#FEE2E2",
            color: "#DC2626",
            borderRadius: "6px",
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
          fontSize: "0.75rem",
          fontWeight: 600,
          fontFamily: "Poppins, sans-serif",
          bgcolor: cfg.bg,
          color: cfg.color,
          border: `1px solid ${cfg.border}`,
          borderRadius: "8px",
          "& .MuiChip-label": { px: 1.5 },
        }}
      />
    </Box>
  );
}

const tabs = [
  {
    label: "All Requests",
    count: 7,
    icon: <ContentCopyOutlinedIcon sx={{ fontSize: 14 }} />,
  },
  {
    label: "Critical",
    count: 5,
    icon: <WarningAmberIcon sx={{ fontSize: 14 }} />,
  },
  {
    label: "New",
    count: 3,
    icon: <InsertDriveFileOutlinedIcon sx={{ fontSize: 14 }} />,
  },
  {
    label: "Resubmitted",
    count: 2,
    icon: <ReplayIcon sx={{ fontSize: 14 }} />,
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const [open, setOpen] = React.useState(false);

  const [approveModal, setApproveModal] = useState(false);
  const [modalName, setModalName] = useState("");

  const handleClose = () => setOpen(false);

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
                        fontSize: "0.8rem",
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
                    fontSize: "0.8rem",
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
                    <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                      Material Request ID
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                      Requester
                      <Typography
                        component='span'
                        sx={{
                          color: "#DC2626",
                          fontWeight: 700,
                          ml: 0.5,
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        (Approver)
                      </Typography>
                    </TableCell>
                    <TableCell
                      align='center'
                      sx={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Number of Materials
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                      Requested On
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                      Required Date
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                      Handled by
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                      Reference No.
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
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
                        <Stack direction='row' alignItems='center' spacing={1}>
                          <Typography
                            fontWeight={600}
                            fontSize='0.875rem'
                            color='#1E293B'
                            sx={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {row.id}
                          </Typography>
                          {row.badges.map((b, i) => (
                            <BadgeIcon key={i} type={b} />
                          ))}
                        </Stack>
                      </TableCell>

                      {/* Requester */}
                      <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                        {row.requester}
                      </TableCell>

                      {/* Materials */}
                      <TableCell
                        align='center'
                        sx={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        <Typography
                          fontWeight={500}
                          sx={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {row.materials}
                        </Typography>
                      </TableCell>

                      {/* Requested On */}
                      <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                        {row.requestedOn}
                      </TableCell>

                      {/* Required Date */}
                      <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                        {row.requiredDate}
                      </TableCell>

                      {/* Handled By + Level */}
                      <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                        <Stack direction='row' alignItems='center' spacing={1}>
                          <Typography
                            sx={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {row.handledBy}
                          </Typography>
                          <Chip
                            label={row.level}
                            size='small'
                            sx={{
                              height: 22,
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              fontFamily: "Poppins, sans-serif",
                              bgcolor: levelConfig[row.level].bg,
                              color: levelConfig[row.level].color,
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
                          sx={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {row.refNo}
                        </Typography>
                      </TableCell>

                      {/* Status */}
                      <TableCell align='right'>
                        <StatusCell
                          status={row.status}
                          approved={row.approved}
                          rejected={row.rejected}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
