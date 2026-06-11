import React, { useState } from "react";
import Navbar from "../../Navbars/Navbar";
import right_icon from "../../Images/Home/Right_icon.png";
import { Grid, Modal } from "@mui/material";
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
import CreateMaterialRequest from "./Modal/CreateMaterialRequest";

import CloseIcon from "@mui/icons-material/Close";

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

const statusConfig = {
  Pending: {
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
  },
  "Final Review": {
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
  },
  Approved: {
    color: "#10b981",
    bg: "#ecfdf5",
    border: "#a7f3d0",
  },
  Rejected: {
    color: "#f43f5e",
    bg: "#fff1f2",
    border: "#fecdd3",
  },
};

const levelConfig = {
  L1: { color: "#6366f1", bg: "#eef2ff" },
  L2: { color: "#8b5cf6", bg: "#f5f3ff" },
};

const ALL_STATUSES = ["Pending", "Final Review", "Approved", "Rejected"];

function StatusChip({ status }) {
  const cfg = statusConfig[status] || {
    color: "#888",
    bg: "#f5f5f5",
    border: "#ddd",
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 1.5,
        py: 0.5,
        borderRadius: "20px",
        border: `1px solid ${cfg.border}`,
        background: cfg.bg,
        color: cfg.color,
        fontWeight: 500,
        fontSize: "0.8rem",
        whiteSpace: "nowrap",
        fontFamily: FONT,
        minWidth: 80,
      }}
    >
      {status}
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
  borderRadius: "10px",
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFilterOpen = (e) => setFilterAnchor(e.currentTarget);
  const handleFilterClose = () => setFilterAnchor(null);

  const toggleStatus = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const filtered = dummyData.filter((row) => {
    const matchSearch =
      search === "" ||
      row.id.toLowerCase().includes(search.toLowerCase()) ||
      row.handledBy.toLowerCase().includes(search.toLowerCase()) ||
      row.status.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(row.status);
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
              variant='h5'
              sx={{
                fontWeight: 700,
                color: "#1a1a2e",
                fontSize: "1.4rem",
                fontFamily: FONT,
              }}
            >
              Track Your Requests
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {/* Search */}
              <TextField
                size='small'
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
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
                variant='outlined'
                size='small'
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
                      size='small'
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
              <Button
                variant='contained'
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
              </Button>
            </Box>
          </Box>

          {/* Table */}
          <TableContainer
            // component={Paper}
            elevation={0}
            sx={{
              border: "1px solid #e5e7eb",
              overflow: "hidden",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#f9fafb" }}>
                  {[
                    "Material Request ID",
                    "Number of Materials",
                    "Required Date",
                    "Requested On",
                    "Handled by",
                    "Status",
                  ].map((col) => (
                    <TableCell
                      key={col}
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.82rem",
                        color: "#6b7280",
                        borderBottom: "1px solid #e5e7eb",
                        py: 1.5,
                        whiteSpace: "nowrap",
                        fontFamily: FONT,
                      }}
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      align='center'
                      sx={{ py: 4, color: "#9ca3af" }}
                    >
                      No records found
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
                    >
                      <TableCell
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: "#111827",
                          borderBottom: "1px solid #f3f4f6",

                          fontFamily: FONT,
                          py: 0,
                        }}
                      >
                        {row.id}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.875rem",
                          color: "#374151",
                          borderBottom: "1px solid #f3f4f6",
                          textAlign: "right",
                          pr: 6,
                          fontFamily: FONT,
                          py: 0,
                        }}
                      >
                        {row.numMaterials}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.875rem",
                          color: "#374151",
                          borderBottom: "1px solid #f3f4f6",
                          fontFamily: FONT,
                          py: 0,
                        }}
                      >
                        {row.requiredDate}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.875rem",
                          color: "#374151",
                          borderBottom: "1px solid #f3f4f6",
                          fontFamily: FONT,
                          py: 0,
                        }}
                      >
                        {row.requestedOn}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "0.875rem",
                          color: "#374151",
                          borderBottom: "1px solid #f3f4f6",
                          fontFamily: FONT,
                          py: 0,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {row.handledBy}
                          {row.level && <LevelBadge level={row.level} />}
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{ borderBottom: "1px solid #f3f4f6", py: 1 }}
                      >
                        <StatusChip status={row.status} />
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
