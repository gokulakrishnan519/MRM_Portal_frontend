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
  Avatar,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import CircularProgress from "@mui/material/CircularProgress";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Timeline from "../../TimeLine";

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

// ── HeaderStatusBadge ────────────────────────────────────────────
function HeaderStatusBadge({ label }) {
  const statusStyles = {
    "L2 Rejected": {
      border: "#F87171",
      color: "#EF4444",
      bg: "#FEF2F2",
    },
    "L1 Review": {
      border: "#FBBF24",
      color: "#D97706",
      bg: "#FFFBEB",
    },
    "L2 Under Review": {
      border: "#60A5FA",
      color: "#2563EB",
      bg: "#EFF6FF",
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

/** Top header bar */
function DialogHeader({ data, props }) {
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
          textAlign: "center",
        }}
      >
        Material Request {data?.materialRequestId}
      </Typography>

      <Box
        sx={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        {props?.rowData?.Resubmitted === true ? (
          <Chip
            icon={<ReplayIcon sx={{ fontSize: "0.75rem !important" }} />}
            label='Resubmitted'
            size='small'
            sx={{
              fontFamily: POPPINS,
              fontSize: "0.68rem",
              bgcolor: colors.resubmitBg,
              color: colors.resubmitText,
              fontWeight: 500,
              height: 24,
              "& .MuiChip-icon": { color: colors.resubmitText },
            }}
          />
        ) : (
          <HeaderStatusBadge label={props.rowData?.Status_text} />
        )}
      </Box>
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
function RequestDetails({ data }) {
  return (
    <SectionCard title='Request Details'>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.5, mb: 1 }}>
        <InfoPair
          label='Required Date'
          value={dayjs(data?.requiredDate).format("DD MMM YYYY")}
        />
        <InfoPair label='Requested By' value={data?.requestedBy} />
        <InfoPair
          label='Requested On'
          value={dayjs(data?.requestedOn).format("DD MMM YYYY")}
        />
      </Box>
      <InfoPair label='Purpose' value={data?.purpose} />
    </SectionCard>
  );
}

// ── Material Details Section ──────────────────────────────────

function MaterialDetails({ data }) {
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
            {data?.materials.map((row, i) => (
              <TableRow key={i} sx={{ "&:last-child td": { borderBottom: 0 } }}>
                <TableCell
                  sx={{ fontFamily: POPPINS, fontSize: "0.72rem", py: 1.2 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {row.materialName}
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
                          fontFamily: POPPINS,
                          fontSize: "0.62rem",
                          fontWeight: 500,
                          bgcolor:
                            row.itemtag == 1
                              ? "#FEE2E2" // Critical
                              : row.itemtag == 2
                                ? "#DBEAFE" // New
                                : "#F3F4F6",
                          color:
                            row.itemtag == 1
                              ? "#DC2626" // Critical
                              : row.itemtag == 2
                                ? "#2563EB" // New
                                : "#6B7280",
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
                  {row.categoryId}
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
function ReviewComments({ data }) {
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
          {data?.previousReviewComment == ""
            ? "-"
            : data?.previousReviewComment}
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
            {data?.rejectedBy}
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
            {data?.approvalLevel}
          </Avatar>
        </Box>
      </Box>
    </SectionCard>
  );
}

// ── Requester Resubmission Note Section ──────────────────────
function ResubmissionNote({ data }) {
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
          {data?.resubmissionReason == "" ? "-" : data?.resubmissionReason}
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
            {data?.requestedBy}
          </Typography>
        </Box>
      </Box>
    </SectionCard>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function ApproveMaterial(props) {
  const [data, setData] = useState(null);
  const [modal, setModal] = useState({
    open: false,
    type: "",
    title: "",
    message: "",
  });
  const [loading, setLoading] = useState("");
  const [note, setNote] = useState("");

  const navigate = useNavigate();

  console.log(props);

  const DetailsAPi = () => {
    setLoading(true);

    const payload = {
      materialRequestId: props?.rowData.MaterialRequestId,
      status: props.rowData?.Status,
    };

    axios
      .post(
        props?.rowData?.Status_text === "L2 Review"
          ? "http://10.10.0.101:8000/mrmuser/L2Review"
          : props?.rowData?.Resubmitted === true
            ? "http://10.10.0.101:8000/mrmuser/Resubmitted"
            : "http://10.10.0.101:8000/mrmuser/l1review/details",
        payload,
      )
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message || err.message || "Login failed";

        sessionStorage.setItem("errormessge", errorMessage);
        navigate("/ErrorHandling");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(data);

  const handleApprove = async () => {
    // props.loadingTrue();
    setLoading(true);
    const payload = {
      _request: {
        MaterialRequirementManagementHeader: {
          HIQ_RequestNo: data?.materialRequestId,

          HIQ_requester_id: sessionStorage.getItem("user_id"),

          HIQ_requester_Name: sessionStorage.getItem("user_name"),

          HIQ_L1ApproverName: "",

          HIQ_L2ApproverName: "",

          HIQ_L1UserId: "",

          HIQ_L2UserId: "",

          HIQ_Required_date: data?.requiredDate,

          HIQ_purpose: data?.purpose,

          HIQ_Status: "1",

          HIQ_movement_Journal_Id: "",

          HIQ_purcharse_Req_Id: "",

          HIQ_commentL1: note,

          HIQ_commentL2: "",

          HIQ_submitted_at: dayjs().format("YYYY-MM-DD[T]HH:mm:ss"),

          HIQ_ApproveDateL1: dayjs().format("YYYY-MM-DD[T]HH:mm:ss"),

          HIQ_synced_at: "",

          HIQ_resubmit_count:
            props.rowData?.Resubmitted == false
              ? 0
              : props.rowData?.Resubmitted == true
                ? 1
                : "",

          HIQ_sync_error: "",

          HIQ_SyncStatus: "0",

          HIQ_ManagerAction: "0",

          resubmissionReason: "",
        },

        MaterialRequirementManagementLine: data?.materials.map((item, i) => ({
          HeaderRequestId: data?.materialRequestId,

          ItemId: item.itemId,

          MaterialName: item.materialName,

          LineNum: i + 1,

          CategoryId: item.categoryId,

          UOM: item.uom,

          AvailableStock:
            item.availableStock == 0.0 ? "0" : String(item.availableStock),

          Quantity: item.quantity,

          ItemTag: String(item.itemtag),

          MovementJournalIdLine: "",

          PurchaseReqIdLine: "",

          SyncStatusLine: "0",

          SyncErrorLine: "",
        })),
      },
    };

    try {
      const response = await axios.post(
        "http://10.10.0.101:8000/mrmuser/create",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      ApproveApi2();
    } catch (error) {
      console.log(error);

      const errorMessage =
        error.response?.data?.detail ||
        "Something went wrong. Please try again later.";

      setModal({
        open: true,
        type: "error",
        title: "Submission Failed",
        message: errorMessage,
      });
    }
  };

  const ApproveApi2 = async () => {
    setLoading(true);

    const payload = {
      _request: {
        MaterialRequirementManagementTransaction: {
          RequestID: data?.materialRequestId,
        },
      },
    };

    try {
      const response = await axios.post(
        "http://10.10.0.101:8000/mrmuser/transaction",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setModal({
        open: true,
        type: "success",
        title: "Request Rejected",
        message: response.data.data.DebugMessage,
      });
    } catch (error) {
      console.log(error);

      const errorMessage =
        error.response?.data?.detail ||
        "Something went wrong. Please try again later.";

      setModal({
        open: true,
        type: "error",
        title: "Submission Failed",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    // props.loadingTrue();
    setLoading(true);
    const payload = {
      _request: {
        MaterialRequirementManagementHeader: {
          HIQ_RequestNo: data?.materialRequestId,

          HIQ_requester_id: sessionStorage.getItem("user_id"),

          HIQ_requester_Name: sessionStorage.getItem("user_name"),

          HIQ_L1ApproverName: "",

          HIQ_L2ApproverName: "",

          HIQ_L1UserId: "",

          HIQ_L2UserId: "",

          HIQ_Required_date: data?.requiredDate,

          HIQ_purpose: data?.purpose,

          HIQ_Status: "2",

          HIQ_movement_Journal_Id: "",

          HIQ_purcharse_Req_Id: "",

          HIQ_commentL1: note,

          HIQ_commentL2: "",

          HIQ_submitted_at: dayjs().format("YYYY-MM-DD[T]HH:mm:ss"),

          HIQ_ApproveDateL1: dayjs().format("YYYY-MM-DD[T]HH:mm:ss"),

          HIQ_synced_at: "",

          HIQ_resubmit_count:
            props.rowData?.Resubmitted == false
              ? 0
              : props.rowData?.Resubmitted == true
                ? 1
                : "",

          HIQ_sync_error: "",

          HIQ_SyncStatus: "0",

          HIQ_ManagerAction: "0",

          resubmissionReason: "",
        },

        MaterialRequirementManagementLine: data?.materials.map((item, i) => ({
          HeaderRequestId: data?.materialRequestId,

          ItemId: item.itemId,

          MaterialName: item.materialName,

          LineNum: i + 1,

          CategoryId: item.categoryId,

          UOM: item.uom,

          AvailableStock:
            item.availableStock == "0" ? "0" : String(item.availableStock),

          Quantity: item.quantity,

          ItemTag: String(item.itemtag),

          MovementJournalIdLine: "",

          PurchaseReqIdLine: "",

          SyncStatusLine: "0",

          SyncErrorLine: "",
        })),
      },
    };

    try {
      const response = await axios.post(
        "http://10.10.0.101:8000/mrmuser/create",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setModal({
        open: true,
        type: "success",
        title: "Request Rejected",
        message: "The request has been rejected successfully.",
      });
    } catch (error) {
      console.log(error);

      const errorMessage =
        error.response?.data?.detail ||
        "Something went wrong. Please try again later.";

      setModal({
        open: true,
        type: "error",
        title: "Submission Failed",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    DetailsAPi();
  }, []);

  console.log(props.rowData);

  return (
    <Box>
      {loading ? (
        <Grid
          sx={{
            minHeight: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress aria-label='Loading…' />
        </Grid>
      ) : (
        <>
          <Grid>
            <DialogHeader data={data} props={props} />

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
                <RequestDetails data={data} />
                <MaterialDetails data={data} />

                {props?.rowData?.Resubmitted == true && (
                  <>
                    <ReviewComments data={data} />
                    <ResubmissionNote data={data} />
                  </>
                )}
              </Grid>

              {props.rowData?.Status_text === "L1 Review" && (
                <Grid
                  sx={{
                    backgroundColor: "#F1F5F9",
                    padding: 3,
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: colors.cardBg,
                      borderRadius: 2,
                      px: 2.5,
                      py: 2,
                    }}
                  >
                    {/* Review Notes input */}
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
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
                        <Box
                          component='span'
                          sx={{ color: colors.approveBtn, ml: 0.25 }}
                        >
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
                </Grid>
              )}

              {props.rowData?.Status_text === "L1 Review" && (
                <>
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
                      onClick={() => {
                        handleApprove();
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
                      onClick={() => {
                        handleReject();
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
                </>
              )}
            </Box>

            {data?.materialRequestId && (
              <Timeline id={data.materialRequestId} />
            )}
          </Grid>

          <Dialog
            open={modal.open}
            onClose={() => setModal({ ...modal, open: false })}
            fullWidth
            maxWidth='xs'
            PaperProps={{
              sx: {
                overflow: "hidden",
              },
            }}
          >
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontWeight: 600,
                fontFamily: "'Inter', 'Poppins', sans-serif",
              }}
            >
              {modal.type === "success" ? (
                <CheckCircleIcon color='success' />
              ) : (
                <ErrorIcon color='error' />
              )}

              {modal.title}
            </DialogTitle>

            {/* ✅ MUST USE DialogContent */}
            <DialogContent
              sx={{
                fontFamily: "'Inter', 'Poppins', sans-serif",
                overflow: "hidden",
                wordBreak: "break-word",
              }}
            >
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
              >
                {modal.message}
              </Typography>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button
                variant='contained'
                onClick={() => {
                  setModal({ ...modal, open: false });
                  window.location.reload();
                }}
                sx={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
}
