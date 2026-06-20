import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Autocomplete,
  Chip,
  Grid,
  Stack,
} from "@mui/material";
import { Refresh, Close, AddCircleOutline } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const emptyRow = () => ({
  id: Date.now(),
  materialName: "",
  materialCategory: "",
  uom: "",
  availableStock: "",
  quantity: "",
});

// Design tokens
const tokens = {
  fontFamily: "'Inter', 'Poppins', sans-serif",
  colors: {
    pageBg: "#F7F8FA",
    cardBg: "#FFFFFF",
    border: "#E4E7EC",
    borderLight: "#F2F4F7",
    text: {
      primary: "#101828",
      secondary: "#344054",
      muted: "#667085",
      placeholder: "#98A2B3",
    },
    accent: {
      indigo: "#4338CA",
      indigoDark: "#3730A3",
      indigoLight: "#EEF2FF",
    },
    danger: "#DC2626",
    dangerLight: "#FEF2F2",
    tableHeader: "#F9FAFB",
  },
  radius: {
    sm: "6px",
    md: "8px",
    lg: "12px",
  },
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: tokens.radius.sm,
    fontSize: "12px",
    fontFamily: tokens.fontFamily,
    backgroundColor: "#fff",
    minHeight: "36px",
    "& fieldset": { borderColor: tokens.colors.border },
    "&:hover fieldset": { borderColor: "#9DA5B4" },
    "&.Mui-focused fieldset": {
      borderColor: tokens.colors.accent.indigo,
      borderWidth: "1.5px",
    },
  },
  "& .MuiInputBase-input": {
    padding: "7px 10px",
    fontFamily: tokens.fontFamily,
    fontSize: "12px",
    color: tokens.colors.text.primary,
    "&::placeholder": { color: tokens.colors.text.placeholder, opacity: 1 },
  },
};

const headerCellSx = {
  fontWeight: 600,
  fontSize: "11px",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  fontFamily: tokens.fontFamily,
  color: tokens.colors.text.muted,
  backgroundColor: tokens.colors.tableHeader,
  borderBottom: `1px solid ${tokens.colors.border}`,
  py: 1.2,
  px: 2,
  whiteSpace: "nowrap",
};

const bodyCellSx = {
  py: 1,
  px: 2,
  borderBottom: `1px solid ${tokens.colors.borderLight}`,
  fontFamily: tokens.fontFamily,
  fontSize: "12px",
  color: tokens.colors.text.primary,
};

function SectionCard({ children, sx = {} }) {
  return (
    <Paper
      elevation={0}
      sx={{
        fontFamily: "Poppins, sans-serif",
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

export default function CreateMaterialRequest(props) {
  const [requiredDate, setRequiredDate] = useState(dayjs());
  const [purpose, setPurpose] = useState("");
  const [rows, setRows] = useState([emptyRow()]);
  const [materialNameList, setMaterialNameList] = useState([]);
  const [materialCategoryList, setMaterialCategoryList] = useState([]);
  const [loading, setLoading] = useState("");
  const [materialLoading, setMaterialLoading] = useState(false);
  const [resubmitReason, setResubmitReason] = useState("");

  const [modal, setModal] = useState({
    open: false,
    type: "",
    title: "",
    message: "",
  });

  const [value, setValue] = useState({});

  const navigate = useNavigate();

  const handleAddMaterial = () => setRows((prev) => [...prev, emptyRow()]);
  const handleRemoveRow = (id) =>
    setRows((prev) => prev.filter((r) => r.id !== id));
  const handleRefreshRow = (id) =>
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...emptyRow(), id } : r)),
    );

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      _request: {
        MaterialRequirementManagementHeader: {
          HIQ_RequestNo: "",
          HIQ_requester_id: "Hi-Q-000922",
          HIQ_requester_Name: "USR_SHIP",
          HIQ_L1ApproverName: "",
          HIQ_L2ApproverName: "",
          HIQ_L2UserId: "",
          HIQ_L1UserId: "",
          HIQ_Required_date: dayjs(requiredDate).format(
            "YYYY-MM-DD[T]00:00:00",
          ),
          HIQ_purpose: purpose,
          HIQ_Status: "0",
          HIQ_movement_Journal_Id: "",
          HIQ_purcharse_Req_Id: "",
          HIQ_commentL1: "okay",
          HIQ_commentL2: "",
          HIQ_resubmit_count: 0,
          HIQ_submitted_at: dayjs().format("YYYY-MM-DD[T]HH:mm:ss"),
          HIQ_ApproveDateL1: "",
          HIQ_synced_at: "",
          HIQ_resubmit_count: 0,
          HIQ_sync_error: "",
          HIQ_SyncStatus: "0",
          HIQ_ManagerAction: "2",
        },
        MaterialRequirementManagementLine: rows.map((item, i) => ({
          HeaderRequestId: "",
          LineNum: i + 1,
          ItemId: item.objectitem === "New" ? "" : item.materialName?.Itemid,
          MaterialName:
            item.objectitem === "New"
              ? item.newmaterialName
              : item.materialName?.name,
          UOM: item.uom,
          AvailableStock:
            item.availableStock == "" ? "0" : String(item.availableStock),
          Quantity: item.quantity == "" ? "0" : String(item.quantity),
          ItemTag:
            item.objectitem === "New" ? "2" : String(item.materialName?.tag),
          CategoryId:
            item.materialCategory == null ? "" : item.materialCategory,
          MovementJournalIdLine: "",
          PurchaseReqIdLine: "",
          SyncStatusLine: "0",
          SyncErrorLine: "",
          resubmissionReason: "",
        })),
      },
    };

    console.log(payload);
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

      if (response.data?.data?.$id === "1") {
        setModal({
          open: true,
          type: "success",
          title: "Request Submitted",
          message: response.data.data.DebugMessage,
        });
      } else {
        setModal({
          open: true,
          type: "error",
          title: "Submission Failed",
          message:
            response.data?.data?.DebugMessage ||
            "Something went wrong. Please try again later.",
        });
      }
    } catch (err) {
      alert("hii");
      const errorMessage =
        err.response?.data?.detail || err.detail || "Something went wrong";

      sessionStorage.setItem("errormessge", errorMessage);

      navigate("/ErrorHandling");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const RehandleSubmit = async () => {
    setLoading(true);
    const payload = {
      _request: {
        MaterialRequirementManagementHeader: {
          HIQ_RequestNo: "",
          HIQ_requester_id: "Hi-Q-000922",
          HIQ_requester_Name: "USR_SHIP",
          HIQ_L1ApproverName: "",
          HIQ_L2ApproverName: "",
          HIQ_L2UserId: "",
          HIQ_L1UserId: "",
          HIQ_Required_date: dayjs(requiredDate).format(
            "YYYY-MM-DD[T]00:00:00",
          ),
          HIQ_purpose: purpose,
          HIQ_Status: "0",
          HIQ_movement_Journal_Id: "",
          HIQ_purcharse_Req_Id: "",
          HIQ_commentL1: value?.rejectionReason,
          HIQ_commentL2: "",
          HIQ_resubmit_count: value?.resubmitCount + 1,
          HIQ_submitted_at: dayjs().format("YYYY-MM-DD[T]HH:mm:ss"),
          HIQ_ApproveDateL1: "",
          HIQ_synced_at: "",
          // HIQ_resubmit_count: 0,
          HIQ_sync_error: "",
          HIQ_SyncStatus: "0",
          HIQ_ManagerAction: "2",
          resubmissionReason: resubmitReason,
        },
        MaterialRequirementManagementLine: rows.map((item, i) => ({
          HeaderRequestId: "",
          LineNum: i + 1,
          ItemId: item.objectitem === "New" ? "" : item.materialName?.Itemid,
          MaterialName:
            item.objectitem === "New"
              ? item.newmaterialName
              : item.materialName?.name,
          UOM: item.uom,
          AvailableStock:
            item.availableStock == "" ? "0" : String(item.availableStock),
          Quantity: item.quantity == "" ? "0" : String(item.quantity),
          ItemTag:
            item.objectitem === "New" ? "2" : String(item.materialName?.tag),
          CategoryId:
            item.materialCategory == null ? "" : item.materialCategory,
          MovementJournalIdLine: "",
          PurchaseReqIdLine: "",
          SyncStatusLine: "0",
          SyncErrorLine: "",
          resubmissionReason: "",
        })),
      },
    };

    console.log(payload);
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

      if (response.data?.data?.$id === "1") {
        setModal({
          open: true,
          type: "success",
          title: "Resubmit Request Submitted",
          message: response.data.data.DebugMessage,
        });
        props.CancelResubmit();
      } else {
        setModal({
          open: true,
          type: "error",
          title: "Submission Failed",
          message:
            response.data?.data?.DebugMessage ||
            "Something went wrong. Please try again later.",
        });
      }
    } catch (err) {
      alert("hii");
      const errorMessage =
        err.response?.data?.detail || err.detail || "Something went wrong";

      sessionStorage.setItem("errormessge", errorMessage);

      navigate("/ErrorHandling");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setRequiredDate("");
    setPurpose("");
    setRows([emptyRow()]);
    props.CancelResubmit();
  };

  const getLabels = async () => {
    if (materialNameList.length > 0) return;

    setMaterialLoading(true);

    try {
      console.time("Material API");

      const response = await axios.post(
        "http://10.10.0.101:8000/mrmuser/label",
      );

      console.timeEnd("Material API");

      setMaterialNameList(response.data.data || []);
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail || err.detail || "Something went wrong";

      sessionStorage.setItem("errormessage", errorMessage);

      navigate("/ErrorHandling");
    } finally {
      setMaterialLoading(false);
    }
  };

  const getMaterialCat = async () => {
    try {
      const response = await axios.post(
        "http://10.10.0.101:8000/mrmuser/materialname",
      );
      setMaterialCategoryList(response.data.data.map((item) => item.name));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRowChange = (index, field, value) => {
    getRowValue(index, value.Itemid);
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  };

  const getRowValue = async (index, itemid) => {
    if (!itemid) return;
    try {
      const response = await axios.post(
        "http://10.10.0.101:8000/mrmuser/materialsfetch",
        { ITEMID: itemid },
      );
      const item = response.data.data;
      setRows((prevRows) =>
        prevRows.map((row, i) =>
          i === index
            ? {
                ...row,
                materialCategory: item.category,
                uom: item.UOM,
                availableStock: item.available_stock,
              }
            : row,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLabels();
    getMaterialCat();
  }, []);

  const isFormValid =
    requiredDate &&
    purpose.trim() !== "" &&
    rows.length > 0 &&
    rows.every((item) => {
      const hasQuantity =
        item.quantity !== "" &&
        item.quantity !== null &&
        item.quantity !== undefined &&
        Number(item.quantity) > 0;

      if (item.objectitem === "New") {
        return item.materialCategory && item.uom && hasQuantity;
      }

      return hasQuantity;
    }) &&
    (!props.l1ReSubmit || resubmitReason.trim() !== "");

  const fetchData = async () => {
    try {
      const payload = {
        materialRequestId: props.l1ReSubmit?.MaterialRequestId,
        status: props.l1ReSubmit?.Status,
      };

      const res = await axios.post(
        "http://10.10.0.101:8000/mrmuser/l1rejected/details",
        payload,
      );

      console.log(res.data);
      setRequiredDate(dayjs(res.data.data.requiredDate));
      setPurpose(res.data.data.purpose);

      const updateData = res.data.data.materials.map((item) => ({
        itemId: item.itemId,

        materialName:
          item.itemtag === 0 || item.itemtag === 1
            ? {
                Itemid: item.itemId,
                name: item.materialName,
                tag: item.itemtag,
              }
            : "",

        materialCategory: item.category,
        uom: item.uom,
        availableStock: item.availableStock,
        quantity: Number(item.quantity),

        newmaterialName: item.itemtag === 2 ? item.materialName : "",
        objectitem: item.itemtag === 2 ? "New" : "",
      }));

      console.log(updateData);

      setRows(updateData);

      setValue(res.data.data);
    } catch (err) {
      // navigate("/ErrorHandling");
    }
  };

  useEffect(() => {
    if (props.l1ReSubmit) {
      fetchData();
    }
  }, [props.l1ReSubmit]);

  console.log(JSON.stringify(rows));

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
          <CircularProgress aria-label='Loading…' />
        </Grid>
      ) : (
        <Box
          sx={{
            backgroundColor: tokens.colors.pageBg,
            minHeight: "100vh",
            py: 4,
            px: { xs: 2, md: 4 },
            fontFamily: tokens.fontFamily,
          }}
        >
          <Grid>
            {/* Page Header */}
            <Box sx={{ maxWidth: 1140, mx: "auto", mb: 3 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: tokens.colors.text.primary,
                  fontSize: "20px",
                  fontFamily: tokens.fontFamily,
                  letterSpacing: "-0.3px",
                }}
              >
                Material Request{" "}
                {props.l1ReSubmit ? value?.materialRequestId : ""}
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: tokens.colors.text.muted,
                  fontFamily: tokens.fontFamily,
                  mt: 0.4,
                }}
              >
                Fill in the details below to raise a new material request.
              </Typography>
            </Box>

            {/* Requirement Details Card */}
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                maxWidth: 1140,
                mx: "auto",
                borderRadius: tokens.radius.lg,
                border: `1px solid ${tokens.colors.border}`,
                backgroundColor: tokens.colors.cardBg,
                p: 3,
                mb: 2.5,
              }}
            >
              {/* Section Label */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}
              >
                <Box
                  sx={{
                    width: 3,
                    height: 18,
                    borderRadius: "2px",
                    backgroundColor: tokens.colors.accent.indigo,
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "13px",
                    color: tokens.colors.text.primary,
                    fontFamily: tokens.fontFamily,
                    letterSpacing: "-0.1px",
                  }}
                >
                  Requirement Details
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  flexWrap: "wrap",
                }}
              >
                {/* Required Date */}
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.6 }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "12px",
                      color: tokens.colors.text.secondary,
                      fontFamily: tokens.fontFamily,
                    }}
                  >
                    Required Date{" "}
                    <span style={{ color: tokens.colors.danger }}>*</span>
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={requiredDate}
                      onChange={(newValue) => setRequiredDate(newValue)}
                      format='DD/MM/YYYY'
                      slotProps={{
                        textField: {
                          variant: "standard",
                          inputProps: { readOnly: true },
                          sx: {
                            border: `1px solid ${tokens.colors.border}`,
                            backgroundColor: "#fff",
                            borderRadius: tokens.radius.sm,
                            width: 148,
                            "&:hover": { borderColor: "#9DA5B4" },
                          },
                          InputProps: {
                            disableUnderline: true,
                            sx: {
                              px: "10px",
                              fontSize: "12px",
                              height: 36,
                              fontFamily: tokens.fontFamily,
                              color: tokens.colors.text.primary,
                              "& .MuiSvgIcon-root": {
                                fontSize: "1rem",
                                color: tokens.colors.text.muted,
                              },
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>

                {/* Purpose */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.6,
                    flex: 1,
                    minWidth: 260,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "12px",
                      color: tokens.colors.text.secondary,
                      fontFamily: tokens.fontFamily,
                    }}
                  >
                    Purpose
                    <span style={{ color: tokens.colors.danger }}>*</span>
                  </Typography>
                  <TextField
                    size='small'
                    fullWidth
                    placeholder='Describe the purpose of this request'
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    sx={inputSx}
                  />
                </Box>
              </Box>
            </Paper>

            {/* Material Details Card */}
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                maxWidth: 1140,
                mx: "auto",
                borderRadius: tokens.radius.lg,
                border: `1px solid ${tokens.colors.border}`,
                backgroundColor: tokens.colors.cardBg,
                p: 3,
                mb: 3,
              }}
            >
              {/* Section Label */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 3,
                      height: 18,
                      borderRadius: "2px",
                      backgroundColor: tokens.colors.accent.indigo,
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "13px",
                      color: tokens.colors.text.primary,
                      fontFamily: tokens.fontFamily,
                      letterSpacing: "-0.1px",
                    }}
                  >
                    Material Details
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: tokens.colors.text.muted,
                    fontFamily: tokens.fontFamily,
                  }}
                >
                  {rows.length} {rows.length === 1 ? "item" : "items"}
                </Typography>
              </Box>

              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  border: `1px solid ${tokens.colors.border}`,
                  borderRadius: tokens.radius.md,
                  overflow: "hidden",
                }}
              >
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ ...headerCellSx, width: "28%" }}>
                        Material Name
                      </TableCell>
                      <TableCell sx={{ ...headerCellSx, width: "20%" }}>
                        Category
                      </TableCell>
                      <TableCell sx={{ ...headerCellSx, width: "11%" }}>
                        UOM
                      </TableCell>
                      <TableCell sx={{ ...headerCellSx, width: "13%" }}>
                        Stock
                      </TableCell>
                      <TableCell
                        sx={{
                          ...headerCellSx,
                          width: "16%",
                          textAlign: "right",
                        }}
                      >
                        Quantity
                      </TableCell>
                      <TableCell
                        sx={{
                          ...headerCellSx,
                          width: "10%",
                          textAlign: "center",
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          backgroundColor: "#fff",
                          "&:hover": { backgroundColor: "#FAFAFA" },
                          "&:last-child td": { borderBottom: "none" },
                          transition: "background 0.1s",
                        }}
                      >
                        {/* Material Name */}
                        <TableCell sx={{ ...bodyCellSx }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              {row.objectitem === "New" ? (
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    color: tokens.colors.text.primary,
                                    fontFamily: tokens.fontFamily,
                                    fontWeight: 500,
                                  }}
                                >
                                  {row.newmaterialName}
                                </Typography>
                              ) : (
                                <Autocomplete
                                  disableClearable
                                  freeSolo
                                  size='small'
                                  onOpen={() => {
                                    if (materialNameList.length === 0) {
                                      getLabels();
                                    }
                                  }}
                                  options={materialNameList}
                                  filterOptions={(options, state) => {
                                    const search =
                                      state.inputValue.toLowerCase();

                                    if (search.length < 2) {
                                      return [];
                                    }

                                    return options
                                      .filter(
                                        (option) =>
                                          option.name
                                            ?.toLowerCase()
                                            .includes(search) ||
                                          option.Itemid?.toLowerCase()?.includes(
                                            search,
                                          ),
                                      )
                                      .slice(0, 50);
                                  }}
                                  value={row.materialName ?? null}
                                  getOptionLabel={(option) =>
                                    typeof option === "string"
                                      ? option
                                      : option
                                        ? `${option.name} - ${option.Itemid}`
                                        : ""
                                  }
                                  isOptionEqualToValue={(option, value) =>
                                    option.Itemid === value.Itemid
                                  }
                                  onInputChange={(_, newInputValue, reason) => {
                                    if (reason === "input")
                                      handleRowChange(
                                        index,
                                        "newmaterialName",
                                        newInputValue,
                                      );
                                  }}
                                  onChange={(_, val) => {
                                    handleRowChange(index, "materialName", val);
                                    handleRowChange(
                                      index,
                                      "newmaterialName",
                                      "",
                                    );
                                  }}
                                  PaperComponent={({ children }) => (
                                    <Paper
                                      sx={{
                                        fontFamily: tokens.fontFamily,
                                        fontSize: "12px",
                                        borderRadius: tokens.radius.md,
                                        border: `1px solid ${tokens.colors.border}`,
                                        boxShadow:
                                          "0 4px 16px rgba(0,0,0,0.08)",
                                      }}
                                    >
                                      {children}
                                    </Paper>
                                  )}
                                  renderOption={(props, option) => (
                                    <li
                                      {...props}
                                      key={option.Itemid}
                                      style={{
                                        fontSize: "12px",
                                        fontFamily: tokens.fontFamily,
                                        padding: "8px 12px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                      }}
                                    >
                                      <span>
                                        {option.name} — {option.Itemid}
                                      </span>
                                      {Number(option.tag) === 1 && (
                                        <Chip
                                          label='Critical'
                                          size='small'
                                          sx={{
                                            fontSize: "10px",
                                            height: 18,
                                            backgroundColor: "#FEF2F2",
                                            color: "#DC2626",
                                            fontFamily: tokens.fontFamily,
                                          }}
                                        />
                                      )}
                                    </li>
                                  )}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      placeholder='Search material…'
                                      sx={{ ...inputSx, width: 200 }}
                                      InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                          <>
                                            {materialLoading && (
                                              <CircularProgress size={18} />
                                            )}
                                            {params.InputProps.endAdornment}
                                          </>
                                        ),
                                      }}
                                    />
                                  )}
                                />
                                // <Autocomplete
                                //   disableClearable
                                //   freeSolo
                                //   size='small'
                                //   options={materialNameList}
                                //   value={row.materialName ?? null}
                                //   getOptionLabel={(option) =>
                                //     typeof option === "string"
                                //       ? option
                                //       : option
                                //         ? `${option.name} - ${option.Itemid}`
                                //         : ""
                                //   }
                                //   isOptionEqualToValue={(option, value) =>
                                //     option.Itemid === value.Itemid
                                //   }
                                //   onInputChange={(_, newInputValue, reason) => {
                                //     if (reason === "input")
                                //       handleRowChange(
                                //         index,
                                //         "newmaterialName",
                                //         newInputValue,
                                //       );
                                //   }}
                                //   onChange={(_, val) => {
                                //     handleRowChange(index, "materialName", val);
                                //     handleRowChange(
                                //       index,
                                //       "newmaterialName",
                                //       "",
                                //     );
                                //   }}
                                //   PaperComponent={({ children }) => (
                                //     <Paper
                                //       sx={{
                                //         fontFamily: tokens.fontFamily,
                                //         fontSize: "12px",
                                //         borderRadius: tokens.radius.md,
                                //         border: `1px solid ${tokens.colors.border}`,
                                //         boxShadow:
                                //           "0 4px 16px rgba(0,0,0,0.08)",
                                //       }}
                                //     >
                                //       {children}
                                //     </Paper>
                                //   )}
                                //   renderOption={(props, option) => (
                                //     <li
                                //       {...props}
                                //       key={option.Itemid}
                                //       style={{
                                //         fontSize: "12px",
                                //         fontFamily: tokens.fontFamily,
                                //         padding: "8px 12px",
                                //         display: "flex",
                                //         alignItems: "center",
                                //         gap: 8,
                                //       }}
                                //     >
                                //       <span>
                                //         {option.name} — {option.Itemid}
                                //       </span>
                                //       {Number(option.tag) === 1 && (
                                //         <Chip
                                //           label='Critical'
                                //           size='small'
                                //           sx={{
                                //             fontSize: "10px",
                                //             height: 18,
                                //             backgroundColor: "#FEF2F2",
                                //             color: "#DC2626",
                                //             fontFamily: tokens.fontFamily,
                                //           }}
                                //         />
                                //       )}
                                //     </li>
                                //   )}
                                //   renderInput={(params) => (
                                //     <TextField
                                //       {...params}
                                //       placeholder='Search material…'
                                //       sx={{ ...inputSx, width: 200 }}
                                //     />
                                //   )}
                                // />
                              )}
                            </Box>

                            {/* New / Cancel button */}
                            {row.objectitem === "New" ? (
                              <Button
                                variant='outlined'
                                size='small'
                                onClick={() =>
                                  setRows((prevRows) =>
                                    prevRows.map((item, i) =>
                                      i === index
                                        ? {
                                            ...item,
                                            objectitem: "Old",
                                            materialName: "",
                                            materialCategory: "",
                                            uom: "",
                                            availableStock: "",
                                            quantity: "",
                                          }
                                        : item,
                                    ),
                                  )
                                }
                                sx={{
                                  minWidth: "52px",
                                  height: "28px",
                                  fontSize: "10px",
                                  fontWeight: 600,
                                  fontFamily: tokens.fontFamily,
                                  borderRadius: tokens.radius.sm,
                                  borderColor: tokens.colors.danger,
                                  color: tokens.colors.danger,
                                  textTransform: "none",
                                  whiteSpace: "nowrap",
                                  "&:hover": {
                                    backgroundColor: tokens.colors.dangerLight,
                                    borderColor: tokens.colors.danger,
                                  },
                                }}
                              >
                                Cancel
                              </Button>
                            ) : row.newmaterialName?.trim() ? (
                              <Button
                                variant='contained'
                                size='small'
                                onClick={() =>
                                  setRows((prevRows) =>
                                    prevRows.map((item, i) =>
                                      i === index
                                        ? { ...item, objectitem: "New" }
                                        : item,
                                    ),
                                  )
                                }
                                sx={{
                                  minWidth: "44px",
                                  height: "28px",
                                  fontSize: "10px",
                                  fontWeight: 600,
                                  fontFamily: tokens.fontFamily,
                                  borderRadius: tokens.radius.sm,
                                  backgroundColor: tokens.colors.accent.indigo,
                                  textTransform: "none",
                                  whiteSpace: "nowrap",
                                  boxShadow: "none",
                                  "&:hover": {
                                    backgroundColor:
                                      tokens.colors.accent.indigoDark,
                                    boxShadow: "none",
                                  },
                                }}
                              >
                                + New
                              </Button>
                            ) : null}
                          </Box>
                        </TableCell>

                        {/* Material Category */}
                        <TableCell sx={bodyCellSx}>
                          {row.objectitem === "New" ? (
                            <Select
                              size='small'
                              fullWidth
                              displayEmpty
                              value={row.materialCategory}
                              onChange={(e) =>
                                setRows((prevRows) =>
                                  prevRows.map((item, i) =>
                                    i === index
                                      ? {
                                          ...item,
                                          materialCategory: e.target.value,
                                        }
                                      : item,
                                  ),
                                )
                              }
                              renderValue={(v) =>
                                v || (
                                  <span
                                    style={{
                                      color: tokens.colors.text.placeholder,
                                      fontSize: 12,
                                      fontFamily: tokens.fontFamily,
                                    }}
                                  >
                                    Select category
                                  </span>
                                )
                              }
                              sx={{
                                fontSize: "12px",
                                fontFamily: tokens.fontFamily,
                                backgroundColor: "#fff",
                                borderRadius: tokens.radius.sm,
                                minHeight: "36px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: tokens.colors.border,
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#9DA5B4",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    borderColor: tokens.colors.accent.indigo,
                                  },
                                "& .MuiSelect-select": {
                                  padding: "7px 10px",
                                  fontFamily: tokens.fontFamily,
                                  fontSize: "12px",
                                },
                              }}
                            >
                              {materialCategoryList.map((c) => (
                                <MenuItem
                                  key={c}
                                  value={c}
                                  sx={{
                                    fontSize: "12px",
                                    fontFamily: tokens.fontFamily,
                                  }}
                                >
                                  {c}
                                </MenuItem>
                              ))}
                            </Select>
                          ) : (
                            <Typography
                              sx={{
                                fontSize: "12px",
                                color: row.materialCategory
                                  ? tokens.colors.text.primary
                                  : tokens.colors.text.muted,
                                fontFamily: tokens.fontFamily,
                              }}
                            >
                              {row.materialCategory || "—"}
                            </Typography>
                          )}
                        </TableCell>

                        {/* UOM */}
                        <TableCell sx={bodyCellSx}>
                          {row.objectitem === "New" ? (
                            <TextField
                              size='small'
                              fullWidth
                              placeholder='UOM'
                              value={row.uom}
                              onChange={(e) =>
                                setRows((prevRows) =>
                                  prevRows.map((item, i) =>
                                    i === index
                                      ? { ...item, uom: e.target.value }
                                      : item,
                                  ),
                                )
                              }
                              sx={inputSx}
                              style={{ width: 50 }}
                            />
                          ) : (
                            <Typography
                              sx={{
                                fontSize: "12px",
                                color: row.uom
                                  ? tokens.colors.text.primary
                                  : tokens.colors.text.muted,
                                fontFamily: tokens.fontFamily,
                              }}
                            >
                              {row.uom || "—"}
                            </Typography>
                          )}
                        </TableCell>

                        {/* Stock */}
                        <TableCell sx={bodyCellSx}>
                          <Box sx={{ display: "inline-flex" }}>
                            {row.availableStock &&
                            row.availableStock !== "-" ? (
                              <Box
                                sx={{
                                  px: 1.2,
                                  py: 0.3,
                                  borderRadius: "20px",
                                  backgroundColor: "#ECFDF5",
                                  border: "1px solid #A7F3D0",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "11px",
                                    color: "#065F46",
                                    fontFamily: tokens.fontFamily,
                                    fontWeight: 600,
                                  }}
                                >
                                  {row.availableStock}
                                </Typography>
                              </Box>
                            ) : (
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  color: tokens.colors.text.muted,
                                  fontFamily: tokens.fontFamily,
                                }}
                              >
                                —
                              </Typography>
                            )}
                          </Box>
                        </TableCell>

                        {/* Quantity */}
                        <TableCell sx={bodyCellSx}>
                          <TextField
                            size='small'
                            fullWidth
                            placeholder='0'
                            type='number'
                            value={row.quantity}
                            onChange={(e) =>
                              setRows((prevRows) =>
                                prevRows.map((item, i) =>
                                  i === index
                                    ? { ...item, quantity: e.target.value }
                                    : item,
                                ),
                              )
                            }
                            sx={{
                              ...inputSx,
                              "& .MuiInputBase-input": {
                                padding: "7px 10px",
                                textAlign: "right",
                                fontFamily: tokens.fontFamily,
                                fontSize: "12px",
                                fontWeight: 500,
                              },
                            }}
                          />
                        </TableCell>

                        {/* Actions */}
                        <TableCell sx={{ ...bodyCellSx, textAlign: "center" }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              gap: 0.5,
                            }}
                          >
                            <IconButton
                              size='small'
                              onClick={() => handleRefreshRow(row.id)}
                              title='Reset row'
                              sx={{
                                color: tokens.colors.text.muted,
                                p: 0.6,
                                borderRadius: tokens.radius.sm,
                                "&:hover": {
                                  color: tokens.colors.accent.indigo,
                                  backgroundColor:
                                    tokens.colors.accent.indigoLight,
                                },
                                transition: "all 0.15s",
                              }}
                            >
                              <Refresh sx={{ fontSize: 15 }} />
                            </IconButton>
                            <IconButton
                              size='small'
                              onClick={() => handleRemoveRow(row.id)}
                              disabled={rows.length === 1}
                              title='Remove row'
                              sx={{
                                color: tokens.colors.text.muted,
                                p: 0.6,
                                borderRadius: tokens.radius.sm,
                                "&:hover": {
                                  color: tokens.colors.danger,
                                  backgroundColor: tokens.colors.dangerLight,
                                },
                                "&.Mui-disabled": {
                                  color: tokens.colors.borderLight,
                                },
                                transition: "all 0.15s",
                              }}
                            >
                              <Close sx={{ fontSize: 15 }} />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Add Material */}
              <Box sx={{ mt: 1.5, px: 0.5 }}>
                <Box
                  onClick={handleAddMaterial}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.7,
                    cursor: "pointer",
                    color: tokens.colors.accent.indigo,
                    py: 0.6,
                    px: 1,
                    borderRadius: tokens.radius.sm,
                    "&:hover": {
                      backgroundColor: tokens.colors.accent.indigoLight,
                    },
                    transition: "background 0.15s",
                    userSelect: "none",
                  }}
                >
                  <AddCircleOutline sx={{ fontSize: 15 }} />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "12px",
                      fontFamily: tokens.fontFamily,
                      color: "inherit",
                    }}
                  >
                    Add Material
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {props.l1ReSubmit ? (
              <>
                {/* ── Rejection Reason ── */}
                <SectionCard
                  sx={{ bgcolor: "#FFF5F5", border: "1px solid #FECACA" }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#111827",
                      mb: 1,
                      fontFamily: "Poppins, sans-serif",
                    }}
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
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "#374151",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {value.rejectionReason}
                    </Typography>
                    <Stack direction='row' spacing={1} alignItems='center'>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "#6B7280",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        Rejected by
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#111827",
                          fontFamily: "Poppins, sans-serif",
                        }}
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
                  sx={{
                    mb: 3,
                    backgroundColor: "#F1F5F9",
                    p: 2,
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#111827",
                      mb: 1,
                      fontFamily: "Poppins, sans-serif",
                    }}
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
              </>
            ) : (
              ""
            )}

            {/* Action Buttons */}
            <Box
              sx={{
                maxWidth: 1140,
                mx: "auto",
                display: "flex",
                gap: 1.5,
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={handleCancel}
                sx={{
                  border: `1.5px solid ${tokens.colors.border}`,
                  color: tokens.colors.text.secondary,
                  fontWeight: 600,
                  fontSize: "12px",
                  fontFamily: tokens.fontFamily,
                  px: 3,
                  py: 0.9,
                  borderRadius: tokens.radius.sm,
                  textTransform: "none",
                  minHeight: "36px",
                  backgroundColor: "#fff",
                  "&:hover": {
                    backgroundColor: tokens.colors.pageBg,
                    borderColor: "#9DA5B4",
                  },
                  transition: "all 0.15s",
                }}
              >
                Cancel
              </Button>
              <>
                {props.l1ReSubmit ? (
                  <Button
                    onClick={RehandleSubmit}
                    disabled={!isFormValid}
                    sx={{
                      backgroundColor: tokens.colors.accent.indigo,
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "12px",
                      fontFamily: tokens.fontFamily,
                      px: 3.5,
                      py: 0.9,
                      borderRadius: tokens.radius.sm,
                      textTransform: "none",
                      minHeight: "36px",
                      boxShadow: "none",
                      transition: "background 0.15s",

                      "&:hover": {
                        backgroundColor: tokens.colors.accent.indigoDark,
                        boxShadow: "none",
                      },

                      "&.Mui-disabled": {
                        backgroundColor: "#e0e0e0",
                        color: "red",
                        cursor: "not-allowed",
                        opacity: 1,
                      },
                    }}
                  >
                    Resubmit Request
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    sx={{
                      backgroundColor: tokens.colors.accent.indigo,
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "12px",
                      fontFamily: tokens.fontFamily,
                      px: 3.5,
                      py: 0.9,
                      borderRadius: tokens.radius.sm,
                      textTransform: "none",
                      minHeight: "36px",
                      boxShadow: "none",
                      transition: "background 0.15s",

                      "&:hover": {
                        backgroundColor: tokens.colors.accent.indigoDark,
                        boxShadow: "none",
                      },

                      "&.Mui-disabled": {
                        backgroundColor: "#e0e0e0",
                        color: "red",
                        cursor: "not-allowed",
                        opacity: 1,
                      },
                    }}
                  >
                    Submit Request
                  </Button>
                )}

                {!isFormValid && (
                  <Typography
                    sx={{
                      color: "red",
                      fontSize: "12px",
                      mt: 1,
                      fontWeight: 500,
                      fontFamily: tokens.fontFamily,
                    }}
                  >
                    * Please fill all required fields.
                    <br />
                    • For New Material: Material Category, UOM and Quantity are
                    required.
                    <br />• For Old Material: Quantity is required.
                    {props.l1ReSubmit && (
                      <>
                        <br />• Resubmission Reason is required.
                      </>
                    )}
                  </Typography>
                )}
              </>
            </Box>
          </Grid>

          <Dialog
            open={modal.open}
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
                  setRows([emptyRow()]);
                  setPurpose("");
                }}
                sx={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </div>
  );
}
