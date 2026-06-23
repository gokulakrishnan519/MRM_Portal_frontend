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
  TextField,
  IconButton,
  Paper,
  Divider,
  Stack,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Timeline from "../../TimeLine";

// ── Theme ────────────────────────────────────────────────────────────────────
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
        root: { fontFamily: "Poppins, sans-serif", fontSize: 13 },
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
    MuiTextField: {
      styleOverrides: {
        root: { fontFamily: "Poppins, sans-serif" },
      },
    },
  },
});

// ── Data ─────────────────────────────────────────────────────────────────────
const materials = [
  {
    id: 1,
    name: "General Purpose Solvent",
    tag: { label: "Critical", color: "error" },
    category: "Solvent",
    uom: "L",
    stock: "50 L",
    quantity: "5 L",
  },
  {
    id: 2,
    name: "Mild Detergent",
    tag: null,
    category: "Sanitation Supplies",
    uom: "Kg",
    stock: "45 Kg",
    quantity: "10 L",
  },
  {
    id: 3,
    name: "Mask",
    tag: { label: "New", color: "info" },
    category: "Safety Equipments",
    uom: "NOS",
    stock: "–",
    quantity: "100 NOS",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ label }) {
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
      }}
    >
      {label}
    </Box>
  );
}

function SectionCard({ children, sx = {} }) {
  return (
    <Paper
      elevation={0}
      sx={{
        // border: "1px solid #E5E7EB",
        backgroundColor: "#F1F5F9",
        borderRadius: 3,
        p: 2.5,
        mb: 2,
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function L1RejectFirstModal({
  onClose,
  rowData,
  loadingFalse,
  openCreateMateralRequestModal,
}) {
  const [resubmitReason, setResubmitReason] = useState("");
  const [value, setValue] = useState({});
  const navigate = useNavigate();
  // console.log("rowdata", rowData);
  const fetchData = async () => {
    try {
      const payload = {
        materialRequestId: rowData.MaterialRequestId,
        status: rowData?.Status,
      };

      const res = await axios.post(
        "http://10.10.0.101:8000/mrmuser/l1rejected/details",
        payload,
      );

      console.log(res.data);
      setValue(res.data.data);
    } catch (err) {
      navigate("/ErrorHandling");
    }
  };
  useEffect(() => {
    if (rowData?.MaterialRequestId) {
      fetchData();
    }
  }, [rowData]);
  return (
    <ThemeProvider theme={theme}>
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
            loadingFalse();
          }}
        />
      </Grid>

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
            loadingFalse();
          }}
        />
      </Grid>

      <Box sx={{ padding: 3 }}>
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
            sx={{ fontWeight: 700, fontSize: 18, color: "#111827" }}
          >
            Material Request {rowData.MaterialRequestId}
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
            <StatusBadge label={rowData.Status_text} />
          </Box>
        </Box>

        {/* ── Requirement Details ── */}
        <SectionCard>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Stack
              direction='row'
              spacing={2}
              alignItems='center'
              sx={{
                backgroundColor: "white",
                p: 2,
                width: "80%",
                borderRadius: "10px",
              }}
            >
              <Typography
                sx={{ fontWeight: 700, fontSize: 14, color: "#111827" }}
              >
                Requirement Details
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#6B7280" }}>
                Required Date&nbsp;
                <Box
                  component='span'
                  sx={{ fontWeight: 600, color: "#111827" }}
                >
                  {dayjs(value.requiredDate).format("DD-MMM-YYYY")}
                </Box>
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#6B7280" }}>
                Purpose&nbsp;
                <Box component='span' sx={{ color: "#9CA3AF" }}>
                  {value.purpose}
                </Box>
              </Typography>
            </Stack>
            <Button
              variant='contained'
              size='small'
              startIcon={<EditIcon sx={{ fontSize: 14 }} />}
              sx={{
                fontSize: 12,
                px: 2,
                py: 0.8,
                bgcolor: "#1D4ED8",
                "&:hover": { bgcolor: "#1E40AF" },
              }}
              onClick={() => {
                openCreateMateralRequestModal(
                  rowData.Status,
                  rowData.MaterialRequestId,
                  "L1 Reject",
                );
              }}
            >
              Edit Request
            </Button>
          </Box>

          {/* ── Material Details Table ── */}
          <Box
            sx={{
              mt: 2.5,
              backgroundColor: "white",
              p: 2,
              borderRadius: "10px",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 13,
                color: "#111827",
                mb: 1.5,
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
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Material Name</TableCell>
                    <TableCell>Material Category</TableCell>
                    <TableCell>UOM</TableCell>
                    <TableCell>Available Stock</TableCell>
                    <TableCell align='right'>Quantity</TableCell>
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
                            {row.materialName}
                          </Typography>
                          {row.itemtag == 0 ? (
                            ""
                          ) : (
                            <Chip
                              label={
                                row.itemtag == 1
                                  ? "Critical"
                                  : row.itemtag == 2
                                    ? "New"
                                    : row.itemtag
                              }
                              size='small'
                              sx={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "0.62rem",
                                fontWeight: 500,
                                bgcolor:
                                  row.itemtag == 1
                                    ? "#FEE2E2" // Critical Background
                                    : row.itemtag == 2
                                      ? "#DBEAFE" // New Background
                                      : "#F3F4F6",
                                color:
                                  row.itemtag == 1
                                    ? "#DC2626" // Critical Text
                                    : row.itemtag == 2
                                      ? "#2563EB" // New Text
                                      : "#374151",
                                height: 20,
                              }}
                            />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ color: "#6B7280" }}>
                        {row.category}
                      </TableCell>
                      <TableCell sx={{ color: "#6B7280" }}>{row.uom}</TableCell>
                      <TableCell sx={{ color: "#6B7280" }} align='right'>
                        {row.availableStock}
                      </TableCell>
                      <TableCell
                        align='right'
                        sx={{ fontWeight: 600, color: "#111827" }}
                      >
                        {row.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </SectionCard>

        {/* ── Rejection Reason ── */}
        <SectionCard sx={{ bgcolor: "#FFF5F5", border: "1px solid #FECACA" }}>
          <Typography
            sx={{ fontWeight: 700, fontSize: 14, color: "#111827", mb: 1 }}
          >
            Rejection Reason
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography sx={{ fontSize: 13, color: "#374151" }}>
              {value.rejectionReason}
            </Typography>
            <Stack direction='row' spacing={1} alignItems='center'>
              <Typography sx={{ fontSize: 12, color: "#6B7280" }}>
                Rejected by
              </Typography>
              <Typography
                sx={{ fontSize: 12, fontWeight: 700, color: "#111827" }}
              >
                {value.rejectedBy}
              </Typography>
              <Box
                sx={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  bgcolor: "#6366F1",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {value.approvalLevel}
              </Box>
            </Stack>
          </Box>
        </SectionCard>

        {/* ── Resubmission Reason ── */}
        <Box
          sx={{ mb: 3, backgroundColor: "#F1F5F9", p: 2, borderRadius: "10px" }}
        >
          <Typography
            sx={{ fontSize: 13, fontWeight: 600, color: "#111827", mb: 1 }}
          >
            Resubmission Reason{" "}
            <Box component='span' sx={{ color: "#EF4444" }}>
              * (R)
            </Box>
          </Typography>
          <TextField
            fullWidth
            placeholder='Explain the changes made or justify the update'
            value={resubmitReason}
            onChange={(e) => setResubmitReason(e.target.value)}
            size='small'
            sx={{
              "& .MuiInputBase-root": {
                fontFamily: "Poppins, sans-serif",
                fontSize: 13,
                borderRadius: 2,
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#D1D5DB" },
                "&:hover fieldset": { borderColor: "#9CA3AF" },
                "&.Mui-focused fieldset": { borderColor: "#2563EB" },
              },
            }}
          />
        </Box>

        <Divider sx={{ mb: 2.5 }} />

        {/* ── Actions ── */}
        <Stack
          direction='row'
          spacing={1.5}
          justifyContent='center'
          alignItems='center'
        >
          <Button
            variant='contained'
            sx={{
              bgcolor: "#FDA4AF",
              color: "#fff",
              px: 3,
              py: 1,
              fontSize: 13,
              cursor: "not-allowed",
              // "&:hover": { bgcolor: "#FB7185" },
            }}
            onClick={() => {
              openCreateMateralRequestModal(
                rowData.Status,
                rowData.MaterialRequestId,
                "L1 Reject",
              );
            }}
          >
            Resubmit Request
          </Button>
          <Button
            variant='outlined'
            sx={{
              borderColor: "#E5E7EB",
              color: "#374151",
              px: 3,
              py: 1,
              fontSize: 13,
              "&:hover": { borderColor: "#9CA3AF", bgcolor: "#F9FAFB" },
            }}
            onClick={() => {
              loadingFalse();
            }}
          >
            Cancel
          </Button>
          <Typography sx={{ fontSize: 13, color: "#EF4444", fontWeight: 600 }}>
            (R)
          </Typography>
        </Stack>

        <Timeline id={rowData.MaterialRequestId} />
      </Box>
    </ThemeProvider>
  );
}
