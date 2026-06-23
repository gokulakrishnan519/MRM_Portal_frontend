import { useEffect, useState } from "react";
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
  IconButton,
  Paper,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InboxIcon from "@mui/icons-material/Inbox";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import Timeline from "../../TimeLine";

// ── Theme ─────────────────────────────────────────────────────────────────────
const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 13,
  },
  palette: {
    background: { default: "#F4F6FB" },
    primary: { main: "#2563EB" },
    error: { main: "#EF4444" },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: "Poppins, sans-serif",
          fontSize: 13,
          padding: "10px 14px",
          whiteSpace: "nowrap",
        },
        head: {
          fontWeight: 600,
          color: "#6B7280",
          backgroundColor: "#F9FAFB",
          fontSize: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "Poppins, sans-serif",
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 13,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "Poppins, sans-serif",
          fontSize: 11,
          fontWeight: 600,
          height: 22,
          borderRadius: 5,
        },
      },
    },
  },
});

// ── Status Chip ───────────────────────────────────────────────────────────────
function StatusChip({ status }) {
  if (!status) return null;

  const statusConfig = {
    Approved: {
      bg: "#D1FAE5",
      color: "#059669",
    },
    Rejected: {
      bg: "#FEE2E2",
      color: "#EF4444",
    },
    Closed: {
      bg: "#E5E7EB",
      color: "#4B5563",
    },
    "In Review": {
      bg: "#DBEAFE",
      color: "#2563EB",
    },
    "Not Found": {
      bg: "#FEF3C7",
      color: "#D97706",
    },
    Submitted: {
      bg: "#EFF6FF",
      color: "#2563EB",
    },
  };

  const config = statusConfig[status] || {
    bg: "#F3F4F6",
    color: "#6B7280",
  };

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        px: 1.5,
        py: 0.4,
        borderRadius: "20px",
        bgcolor: config.bg,
        color: config.color,
        fontSize: 11,

        fontFamily: "Poppins, sans-serif",
        minWidth: 72,
      }}
    >
      {status}
    </Box>
  );
}

// ── L2 Badge ──────────────────────────────────────────────────────────────────
function ReviewerBadge({ name, badge }) {
  return (
    <Stack direction="row" spacing={0.7} alignItems="center" sx={{ mt: 0.8 }}>
      <Typography
        sx={{
          fontSize: 11,
          color: "#6B7280",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Rejected by
      </Typography>
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          color: "#111827",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {name}
      </Typography>
      <Box
        sx={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          bgcolor: "#6366F1",
          color: "#fff",
          fontSize: 9,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {badge}
      </Box>
    </Stack>
  );
}

// ── Header Badge ──────────────────────────────────────────────────────────────
function HeaderStatusBadge({ label }) {
  const statusStyles = {
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

  const style = statusStyles[label] || {
    border: "#D1D5DB",
    color: "#6B7280",
    bg: "#F9FAFB",
  };

  return (
    <Box
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: "20px",

        color: style.color,
        bgcolor: style.bg,
        fontSize: 11,
        // fontWeight: 600,
        fontFamily: "Poppins, sans-serif",
        display: "inline-block",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Box>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function L2RejectModal(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  console.log(props);

  const DetailsAPi = () => {
    setLoading(true);
    const payload = {
      materialRequestId: props.rowData.MaterialRequestId,
      // materialRequestId: "Hi-Q-012253",
    };

    axios
      .post("http://10.10.0.101:8000/request/details", payload)
      .then((res) => {
        console.log(console.log(res));
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response?.status === 404) {
          setData(null);
        } else {
          setData(null); // or [] if data is an array
        }
        // const errorMessage =
        //   err.response?.data?.message || err.message || "Login failed";
        // //console.log(err);
        // navigate("/ErrorHandling");
        // sessionStorage.setItem("errormessge", errorMessage);
        // // setLoading(false);
      });
  };

  useEffect(() => {
    DetailsAPi();
  }, []);

  console.log(props.rowData);

  return (
    <div>
      {loading ? (
        <Grid
          sx={{
            minHeight: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress aria-label="Loading…" />
        </Grid>
      ) : (
        <ThemeProvider theme={theme}>
          {/* Backdrop */}

          {data == null ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "300px",
                gap: 2,
              }}
            >
              <InboxIcon sx={{ fontSize: 60, color: "#BDBDBD" }} />
              <Typography variant="h6" color="text.secondary">
                No Data Available
              </Typography>
              <Typography variant="body2" color="text.secondary">
                There is nothing to display at the moment.
              </Typography>
            </Box>
          ) : (
            <Box>
              {!loading && (
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
                      props.loadingFalse();
                    }}
                  />
                </Grid>
              )}
              {/* Modal Card */}
              <Box sx={{ padding: 1 }}>
                {/* ── Header ── */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2.5,
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#111827",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    Material Request {data?.materialRequestId}
                  </Typography>

                  <Box
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <HeaderStatusBadge label={props.rowData?.Status_text} />
                  </Box>
                </Box>

                <Box
                  sx={{
                    background: "#F1F5F9",
                    px: 3,
                    py: 2,
                    borderRadius: "13px",
                  }}
                >
                  {/* ── Requirement Details ── */}
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      p: 2.5,
                      mb: 2,
                    }}
                  >
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 14,
                          color: "#111827",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        Requirement Details
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "#6B7280",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        Required Date{" "}
                        <Box
                          component="span"
                          sx={{ fontWeight: 600, color: "#111827" }}
                        >
                          {dayjs(data?.requiredDate).format("DD MMM YYYY")}
                        </Box>
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "#6B7280",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        Purpose{" "}
                        <Box component="span" sx={{ color: "#9CA3AF" }}>
                          {data?.purpose}
                        </Box>
                      </Typography>
                    </Stack>
                  </Paper>

                  {/* ── Material Details ── */}
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      p: 2.5,
                      mb: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 14,
                        color: "#111827",
                        mb: 1.5,
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      Material Details
                    </Typography>

                    <TableContainer
                      sx={{
                        border: "1px solid #E5E7EB",
                        borderRadius: 2,
                        // overflow: "hidden",
                      }}
                    >
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Material Name</TableCell>
                            <TableCell>Material Category</TableCell>
                            <TableCell>UOM</TableCell>
                            <TableCell>Available Stock</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell align="center">
                              Workflow Status
                            </TableCell>
                            <TableCell>Reference No.</TableCell>
                            <TableCell>Review Notes</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data?.materials.map((item, index) => (
                            <TableRow
                              key={index}
                              sx={{ "&:hover": { bgcolor: "#F9FAFB" } }}
                            >
                              <TableCell>
                                <Stack
                                  direction="row"
                                  spacing={0.8}
                                  alignItems="center"
                                >
                                  <Typography
                                    sx={{
                                      fontSize: 13,
                                      fontFamily: "Poppins, sans-serif",
                                      color: "#111827",
                                    }}
                                  >
                                    {item.materialName}
                                  </Typography>

                                  {item.itemtag == 0 ? (
                                    ""
                                  ) : (
                                    <Chip
                                      label={
                                        item.itemtag === 1
                                          ? "Critical"
                                          : item.itemtag === 2
                                            ? "New"
                                            : item.itemtag
                                      }
                                      size="small"
                                      sx={{
                                        fontFamily: "Poppins, sans-serif",
                                        fontSize: "0.62rem",
                                        fontWeight: 500,
                                        height: 22,
                                        borderRadius: "12px",
                                        bgcolor:
                                          item.itemtag === 1
                                            ? "#FEE2E2" // Critical
                                            : item.itemtag === 2
                                              ? "#DBEAFE" // New
                                              : "#F3F4F6",
                                        color:
                                          item.itemtag === 1
                                            ? "#DC2626"
                                            : item.itemtag === 2
                                              ? "#2563EB"
                                              : "#374151",

                                        "& .MuiChip-label": {
                                          px: 1,
                                        },
                                      }}
                                    />
                                  )}
                                </Stack>
                              </TableCell>

                              <TableCell sx={{ color: "#6B7280" }}>
                                {item.category || "-"}
                              </TableCell>

                              <TableCell sx={{ color: "#6B7280" }}>
                                {item.uom}
                              </TableCell>

                              <TableCell
                                align="right"
                                sx={{ color: "#6B7280" }}
                              >
                                {item.availableStock}
                              </TableCell>

                              <TableCell
                                align="right"
                                sx={{ fontWeight: 600, color: "#111827" }}
                              >
                                {item.quantity}
                              </TableCell>

                              <TableCell>
                                <StatusChip status={item.status} />
                              </TableCell>

                              <TableCell sx={{ color: "#6B7280" }}>
                                {item.referenceNo}
                              </TableCell>

                              <TableCell
                                sx={{
                                  color: "#374151",
                                  // maxWidth: 250,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.reviewNotes || "-"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Box>

                {(props.rowData?.Status == 5 || props.rowData?.Status == 3) && (
                  <>
                    {/* ── Action Buttons ── */}
                    <Stack
                      direction="row"
                      spacing={1.5}
                      justifyContent="center"
                      alignItems="center"
                      sx={{ mt: 2 }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#F43F5E",
                          color: "#fff",
                          px: 3,
                          py: 1,
                          "&:hover": { bgcolor: "#E11D48" },
                        }}
                        onClick={() => {
                          props.openCreateMateralRequestModal(
                            props.rowData?.Status,
                            data?.materialRequestId,
                            "L2 Reject",
                          );

                          console.log(
                            props.rowData?.Status,
                            data?.materialRequestId,
                          );
                        }}
                      >
                        Create New Request
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: "#E5E7EB",
                          color: "#374151",
                          px: 3,
                          py: 1,
                          "&:hover": {
                            borderColor: "#9CA3AF",
                            bgcolor: "#F9FAFB",
                          },
                        }}
                        onClick={() => {
                          props.loadingFalse();
                        }}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </>
                )}

                <Timeline id={props.rowData.MaterialRequestId} />
              </Box>
            </Box>
          )}
        </ThemeProvider>
      )}
    </div>
  );
}
