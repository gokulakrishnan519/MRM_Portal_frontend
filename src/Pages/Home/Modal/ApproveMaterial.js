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
  TextField,
  IconButton,
  Paper,
  Divider,
  Avatar,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";

// ── Token system ──────────────────────────────────────────────
const POPPINS = "'Poppins', 'Poppins Fallback', sans-serif";

const colors = {
  pageBg: "#F0F2F5",
  cardBg: "#FFFFFF",
  border: "#E5E7EB",
  labelGray: "#6B7280",
  valueBlack: "#111827",
  criticalBg: "#FEE2E2",
  criticalText: "#DC2626",
  resubmitBg: "#E0F2FE",
  resubmitText: "#0284C7",
  avatarBg: "#DBEAFE",
  avatarText: "#1D4ED8",
  approveBtn: "#EF4444",
  rejectBorder: "#EF4444",
  rejectText: "#EF4444",
  headerDivider: "#F3F4F6",
};

// ── Sub-components ────────────────────────────────────────────

/** Top header bar */
function DialogHeader({ onClose }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        pt: 2.5,
        pb: 2,
        position: "relative",
        borderBottom: `1px solid ${colors.headerDivider}`,
      }}
    >
      <Typography
        variant='h6'
        sx={{
          fontFamily: POPPINS,
          fontWeight: 600,
          color: colors.valueBlack,
          fontSize: "1rem",
        }}
      >
        Material Request MR-1028
      </Typography>

      <Chip
        icon={<ReplayIcon sx={{ fontSize: "0.75rem !important" }} />}
        label='Resubmitted'
        size='small'
        sx={{
          position: "absolute",
          right: 44,
          fontFamily: POPPINS,
          fontSize: "0.68rem",
          bgcolor: colors.resubmitBg,
          color: colors.resubmitText,
          fontWeight: 500,
          height: 24,
          "& .MuiChip-icon": { color: colors.resubmitText },
        }}
      />
    </Box>
  );
}

/** Section wrapper card */
function SectionCard({ title, children, sx }) {
  return (
    <Box
      sx={{
        bgcolor: colors.cardBg,
        // border: `1px solid ${colors.border}`,
        borderRadius: 2,

        ...sx,
      }}
    >
      <Box sx={{ px: 2.5, py: 1.5 }}>
        <Typography
          sx={{
            fontFamily: POPPINS,
            fontWeight: 600,
            fontSize: "0.8rem",
            color: colors.valueBlack,
            mb: 1.5,
          }}
        >
          {title}
        </Typography>
        {children}
      </Box>
    </Box>
  );
}

/** Inline label + value pair */
function InfoPair({ label, value }) {
  return (
    <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.75 }}>
      <Typography
        sx={{
          fontFamily: POPPINS,
          fontSize: "0.72rem",
          color: colors.labelGray,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: POPPINS,
          fontSize: "0.72rem",
          fontWeight: 500,
          color: colors.valueBlack,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

// ── Request Details Section ───────────────────────────────────
function RequestDetails() {
  return (
    <SectionCard title='Request Details'>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.5, mb: 1 }}>
        <InfoPair label='Required Date' value='10 May 2026' />
        <InfoPair label='Requested By' value='Vishnu' />
        <InfoPair label='Requested On' value='12 April 2026' />
      </Box>
      <InfoPair
        label='Purpose'
        value='General maintenance and sanitation requirements'
      />
    </SectionCard>
  );
}

// ── Material Details Section ──────────────────────────────────
const materialRows = [
  {
    name: "General Purpose Solvent",
    critical: true,
    category: "Solvent",
    uom: "L",
    availableStock: "50 L",
    quantity: "5 L",
  },
  {
    name: "Mild Detergent",
    critical: false,
    category: "Sanitation Supplies",
    uom: "Kg",
    availableStock: "45 Kg",
    quantity: "10 L",
  },
];

function MaterialDetails() {
  return (
    <SectionCard title='Material Details' sx={{ mt: 2 }}>
      <TableContainer
        sx={{ borderRadius: 1.5, border: `1px solid ${colors.border}` }}
      >
        <Table size='small'>
          <TableHead>
            <TableRow sx={{ bgcolor: colors.headerDivider }}>
              {[
                "Material Name",
                "Material Category",
                "UOM",
                "Available Stock",
                "Quantity",
              ].map((col) => (
                <TableCell
                  key={col}
                  sx={{
                    fontFamily: POPPINS,
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: colors.labelGray,
                    borderBottom: `1px solid ${colors.border}`,
                    py: 1,
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {materialRows.map((row, i) => (
              <TableRow key={i} sx={{ "&:last-child td": { borderBottom: 0 } }}>
                <TableCell
                  sx={{ fontFamily: POPPINS, fontSize: "0.72rem", py: 1.2 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {row.name}
                    {row.critical && (
                      <Chip
                        label='Critical'
                        size='small'
                        sx={{
                          fontFamily: POPPINS,
                          fontSize: "0.62rem",
                          fontWeight: 500,
                          bgcolor: colors.criticalBg,
                          color: colors.criticalText,
                          height: 20,
                        }}
                      />
                    )}
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: POPPINS,
                    fontSize: "0.72rem",
                    color: colors.labelGray,
                  }}
                >
                  {row.category}
                </TableCell>
                <TableCell sx={{ fontFamily: POPPINS, fontSize: "0.72rem" }}>
                  {row.uom}
                </TableCell>
                <TableCell sx={{ fontFamily: POPPINS, fontSize: "0.72rem" }}>
                  {row.availableStock}
                </TableCell>
                <TableCell sx={{ fontFamily: POPPINS, fontSize: "0.72rem" }}>
                  {row.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </SectionCard>
  );
}

// ── Previous Review Comments Section ─────────────────────────
function ReviewComments() {
  return (
    <SectionCard title='Previous Review Comments' sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: POPPINS,
            fontSize: "0.72rem",
            color: colors.labelGray,
          }}
        >
          Requested quantity exceeds the approved consumption limit.
        </Typography>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}
        >
          <Typography
            sx={{
              fontFamily: POPPINS,
              fontSize: "0.68rem",
              color: colors.labelGray,
            }}
          >
            Rejected by
          </Typography>
          <Typography
            sx={{
              fontFamily: POPPINS,
              fontSize: "0.72rem",
              fontWeight: 500,
              color: colors.valueBlack,
            }}
          >
            Kannon
          </Typography>
          <Avatar
            sx={{
              width: 20,
              height: 20,
              fontSize: "0.6rem",
              bgcolor: colors.avatarBg,
              color: colors.avatarText,
              fontFamily: POPPINS,
              fontWeight: 600,
            }}
          >
            LI
          </Avatar>
        </Box>
      </Box>
    </SectionCard>
  );
}

// ── Requester Resubmission Note Section ──────────────────────
function ResubmissionNote() {
  return (
    <SectionCard title='Requester Resubmission Note' sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: POPPINS,
            fontSize: "0.72rem",
            color: colors.labelGray,
          }}
        >
          Requested quantities have been revised to align with approved
          consumption limits and current operational requirements.
        </Typography>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}
        >
          <Typography
            sx={{
              fontFamily: POPPINS,
              fontSize: "0.68rem",
              color: colors.labelGray,
            }}
          >
            Requested by
          </Typography>
          <Typography
            sx={{
              fontFamily: POPPINS,
              fontSize: "0.72rem",
              fontWeight: 500,
              color: colors.valueBlack,
            }}
          >
            Vishnu
          </Typography>
        </Box>
      </Box>
    </SectionCard>
  );
}

// ── Review Notes + Action Footer ─────────────────────────────
function ReviewFooter() {
  const [note, setNote] = useState("");

  return (
    <Box
      sx={{
        bgcolor: colors.cardBg,
        borderRadius: 2,
        px: 2.5,
        py: 2,
      }}
    >
      {/* Review Notes input */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Typography
          sx={{
            fontFamily: POPPINS,
            fontWeight: 600,
            fontSize: "0.8rem",
            color: colors.valueBlack,
            whiteSpace: "nowrap",
          }}
        >
          Review Notes
          <Box component='span' sx={{ color: colors.approveBtn, ml: 0.25 }}>
            (A)
          </Box>
        </Typography>
        <TextField
          fullWidth
          size='small'
          placeholder='Add optional approval comments'
          value={note}
          onChange={(e) => setNote(e.target.value)}
          sx={{
            "& .MuiInputBase-root": {
              fontFamily: POPPINS,
              fontSize: "0.72rem",
              bgcolor: "#FAFAFA",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.border,
            },
          }}
        />
      </Box>
    </Box>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function ApproveMaterial() {
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant='contained'
          onClick={() => setOpen(true)}
          sx={{ fontFamily: POPPINS, textTransform: "none" }}
        >
          Open Dialog
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Grid>
        <DialogHeader onClose={() => setOpen(false)} />

        <Box
          sx={{
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            // maxHeight: "80vh",
          }}
        >
          <Grid
            sx={{ backgroundColor: "#F1F5F9", padding: 3, borderRadius: 2 }}
          >
            <RequestDetails />
            <MaterialDetails />

            <ReviewComments />
            <ResubmissionNote />
          </Grid>

          <Grid
            sx={{ backgroundColor: "#F1F5F9", padding: 3, borderRadius: 2 }}
          >
            <ReviewFooter />
          </Grid>

          {/* Action buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1.5,
              alignItems: "center",
            }}
          >
            <Button
              variant='contained'
              sx={{
                fontFamily: POPPINS,
                fontWeight: 600,
                fontSize: "0.78rem",
                bgcolor: colors.approveBtn,
                textTransform: "none",
                borderRadius: 1.5,
                px: 3.5,
                boxShadow: "none",
                "&:hover": { bgcolor: "#DC2626", boxShadow: "none" },
              }}
            >
              Approve
            </Button>
            <Button
              variant='outlined'
              sx={{
                fontFamily: POPPINS,
                fontWeight: 600,
                fontSize: "0.78rem",
                color: colors.rejectText,
                borderColor: colors.rejectBorder,
                textTransform: "none",
                borderRadius: 1.5,
                px: 3.5,
                "&:hover": {
                  bgcolor: "#FEF2F2",
                  borderColor: colors.rejectBorder,
                },
              }}
            >
              Reject
            </Button>
            <Typography
              sx={{
                fontFamily: POPPINS,
                fontSize: "0.72rem",
                color: colors.labelGray,
              }}
            >
              (A)
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
