import { useState } from "react";
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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

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

// ── Data ──────────────────────────────────────────────────────────────────────
const materials = [
  {
    id: 1,
    name: "General Purpose Solvent",
    tag: { label: "Critical", bg: "#FEE2E2", color: "#EF4444" },
    category: "Solvent",
    uom: "L",
    stock: "50 L",
    quantity: "5 L",
    status: null,
    refNo: null,
    reviewNotes: null,
    reviewedBy: null,
    reviewerBadge: null,
    rowSpan: false,
  },
  {
    id: 2,
    name: "Mild Detergent",
    tag: null,
    category: "Sanitation Supplies",
    uom: "Kg",
    stock: "45 Kg",
    quantity: "10 L",
    status: "Rejected",
    refNo: "MJ-234",
    reviewNotes:
      "Regarding Mild Detergent does not comply with procurement guidelines.",
    reviewedBy: "Senthil",
    reviewerBadge: "L2",
    rowSpan: true,
  },
  {
    id: 3,
    name: "Gloves",
    tag: { label: "New", bg: "#DBEAFE", color: "#2563EB" },
    category: "Safety Equipments",
    uom: "NOS",
    stock: "–",
    quantity: "100 NOS",
    status: null,
    refNo: null,
    reviewNotes: null,
    reviewedBy: null,
    reviewerBadge: null,
    rowSpan: false,
  },
  {
    id: 4,
    name: "Mask",
    tag: { label: "New", bg: "#DBEAFE", color: "#2563EB" },
    category: "Safety Equipments",
    uom: "NOS",
    stock: "–",
    quantity: "100 NOS",
    status: "Approved",
    refNo: "PR-109",
    reviewNotes: "–",
    reviewedBy: null,
    reviewerBadge: null,
    rowSpan: true,
  },
];

// ── Status Chip ───────────────────────────────────────────────────────────────
function StatusChip({ status }) {
  if (!status) return null;
  const isApproved = status === "Approved";
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        px: 1.5,
        py: 0.4,
        borderRadius: "20px",
        bgcolor: isApproved ? "#D1FAE5" : "#FEE2E2",
        color: isApproved ? "#059669" : "#EF4444",
        fontSize: 11,
        fontWeight: 600,
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
    <Stack direction='row' spacing={0.7} alignItems='center' sx={{ mt: 0.8 }}>
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
  return (
    <Box
      sx={{
        px: 1.5,
        py: 0.3,
        borderRadius: "20px",
        border: "1.5px solid #F87171",
        color: "#EF4444",
        fontSize: 11,
        fontWeight: 600,
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
export default function L2RejectModal({ onClose }) {
  return (
    <ThemeProvider theme={theme}>
      {/* Backdrop */}
      <Box>
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
              variant='h6'
              sx={{
                fontWeight: 700,
                fontSize: 18,
                color: "#111827",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Material Request MR-1022
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
              <HeaderStatusBadge label='L2 Rejected' />
            </Box>
          </Box>

          <Box
            sx={{ background: "#F1F5F9", px: 3, py: 2, borderRadius: "13px" }}
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
              <Stack direction='row' spacing={3} alignItems='center'>
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
                    component='span'
                    sx={{ fontWeight: 600, color: "#111827" }}
                  >
                    10 May 2026
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
                  <Box component='span' sx={{ color: "#9CA3AF" }}>
                    –
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
                  overflow: "hidden",
                }}
              >
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Material Name</TableCell>
                      <TableCell>Material Category</TableCell>
                      <TableCell>UOM</TableCell>
                      <TableCell>Available Stock</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Reference No.</TableCell>
                      <TableCell>Review Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Row 1 — General Purpose Solvent (no status, spans visually grouped with Mild Detergent) */}
                    <TableRow sx={{ "&:hover": { bgcolor: "#F9FAFB" } }}>
                      <TableCell>
                        <Stack
                          direction='row'
                          spacing={0.8}
                          alignItems='center'
                        >
                          <Typography
                            sx={{
                              fontSize: 13,
                              fontFamily: "Poppins, sans-serif",
                              color: "#111827",
                            }}
                          >
                            General Purpose Solvent
                          </Typography>
                          <Chip
                            label='Critical'
                            size='small'
                            sx={{ bgcolor: "#FEE2E2", color: "#EF4444" }}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ color: "#6B7280" }}>Solvent</TableCell>
                      <TableCell sx={{ color: "#6B7280" }}>L</TableCell>
                      <TableCell sx={{ color: "#6B7280" }}>50 L</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#111827" }}>
                        5 L
                      </TableCell>
                      {/* Status + Ref + Notes span 2 rows (Mild Detergent group) */}
                      <TableCell
                        rowSpan={2}
                        sx={{
                          verticalAlign: "middle",
                          borderLeft: "1px solid #E5E7EB",
                        }}
                      >
                        <StatusChip status='Rejected' />
                      </TableCell>
                      <TableCell
                        rowSpan={2}
                        sx={{
                          verticalAlign: "middle",
                          color: "#6B7280",
                          borderLeft: "1px solid #E5E7EB",
                        }}
                      >
                        MJ-234
                      </TableCell>
                      <TableCell
                        rowSpan={2}
                        sx={{
                          verticalAlign: "top",
                          maxWidth: 200,
                          borderLeft: "1px solid #E5E7EB",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 12,
                            color: "#374151",
                            fontFamily: "Poppins, sans-serif",
                            lineHeight: 1.5,
                          }}
                        >
                          Regarding Mild Detergent does not comply with
                          procurement guidelines.
                        </Typography>
                        <ReviewerBadge name='Senthil' badge='L2' />
                      </TableCell>
                    </TableRow>

                    {/* Row 2 — Mild Detergent */}
                    <TableRow sx={{ "&:hover": { bgcolor: "#F9FAFB" } }}>
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: 13,
                            fontFamily: "Poppins, sans-serif",
                            color: "#111827",
                          }}
                        >
                          Mild Detergent
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "#6B7280" }}>
                        Sanitation Supplies
                      </TableCell>
                      <TableCell sx={{ color: "#6B7280" }}>Kg</TableCell>
                      <TableCell sx={{ color: "#6B7280" }}>45 Kg</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#111827" }}>
                        10 L
                      </TableCell>
                    </TableRow>

                    {/* Row 3 — Gloves (spans with Mask for Approved group) */}
                    <TableRow sx={{ "&:hover": { bgcolor: "#F9FAFB" } }}>
                      <TableCell>
                        <Stack
                          direction='row'
                          spacing={0.8}
                          alignItems='center'
                        >
                          <Typography
                            sx={{
                              fontSize: 13,
                              fontFamily: "Poppins, sans-serif",
                              color: "#111827",
                            }}
                          >
                            Gloves
                          </Typography>
                          <Chip
                            label='New'
                            size='small'
                            sx={{ bgcolor: "#DBEAFE", color: "#2563EB" }}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ color: "#6B7280" }}>
                        Safety Equipments
                      </TableCell>
                      <TableCell sx={{ color: "#6B7280" }}>NOS</TableCell>
                      <TableCell sx={{ color: "#6B7280" }}>–</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#111827" }}>
                        100 NOS
                      </TableCell>
                      <TableCell
                        rowSpan={2}
                        sx={{
                          verticalAlign: "middle",
                          borderLeft: "1px solid #E5E7EB",
                        }}
                      >
                        <StatusChip status='Approved' />
                      </TableCell>
                      <TableCell
                        rowSpan={2}
                        sx={{
                          verticalAlign: "middle",
                          color: "#6B7280",
                          borderLeft: "1px solid #E5E7EB",
                        }}
                      >
                        PR-109
                      </TableCell>
                      <TableCell
                        rowSpan={2}
                        sx={{
                          verticalAlign: "middle",
                          color: "#9CA3AF",
                          borderLeft: "1px solid #E5E7EB",
                        }}
                      >
                        –
                      </TableCell>
                    </TableRow>

                    {/* Row 4 — Mask */}
                    <TableRow
                      sx={{
                        "&:last-child td": { border: 0 },
                        "&:hover": { bgcolor: "#F9FAFB" },
                      }}
                    >
                      <TableCell>
                        <Stack
                          direction='row'
                          spacing={0.8}
                          alignItems='center'
                        >
                          <Typography
                            sx={{
                              fontSize: 13,
                              fontFamily: "Poppins, sans-serif",
                              color: "#111827",
                            }}
                          >
                            Mask
                          </Typography>
                          <Chip
                            label='New'
                            size='small'
                            sx={{ bgcolor: "#DBEAFE", color: "#2563EB" }}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ color: "#6B7280" }}>
                        Safety Equipments
                      </TableCell>
                      <TableCell sx={{ color: "#6B7280" }}>NOS</TableCell>
                      <TableCell sx={{ color: "#6B7280" }}>–</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#111827" }}>
                        100 NOS
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>

          {/* ── Action Buttons ── */}
          <Stack
            direction='row'
            spacing={1.5}
            justifyContent='center'
            alignItems='center'
            sx={{ mt: 2 }}
          >
            <Button
              variant='contained'
              sx={{
                bgcolor: "#F43F5E",
                color: "#fff",
                px: 3,
                py: 1,
                "&:hover": { bgcolor: "#E11D48" },
              }}
              onClick={() => alert("Creating New Request...")}
            >
              Create New Request
            </Button>
            <Button
              variant='outlined'
              sx={{
                borderColor: "#E5E7EB",
                color: "#374151",
                px: 3,
                py: 1,
                "&:hover": { borderColor: "#9CA3AF", bgcolor: "#F9FAFB" },
              }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Typography
              sx={{
                fontSize: 13,
                color: "#EF4444",
                fontWeight: 600,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              (R)
            </Typography>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
