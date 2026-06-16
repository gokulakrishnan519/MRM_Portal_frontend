import { useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Card,
  Divider,
  Chip,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Inventory2Outlined,
  LockOutlined,
  PhoneOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import UserContext from "../../UseContext/UserContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
export default function Login() {
  const { loadingpage, setLoadingpage } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleLogin = async () => {
    const validationErrors = validate();
    setLoading(true);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }
    const payload = {
      username: username,
      password: password,
    };
    await axios
      .post(" http://10.10.0.101:8000/mrmuser/login ", payload)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          sessionStorage.setItem("success", "true");
          sessionStorage.setItem("user_id", res.data.user_id);
          sessionStorage.setItem("user_name", res.data.user_name);
          sessionStorage.setItem("role", res.data.role);
          sessionStorage.setItem("approver_name", res.data.approver_name);

          navigate("/Home");
          // setTimeout(() => {
          //   setLoading(false);
          //   navigate("/Home");
          // }, 1500);
        } else {
          setApiError(res.data.message);
          setOpenDialog(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        setApiError(err.response?.data?.message || "Something went wrong");
        navigate("/ErrorHandling");
      });
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      fontFamily: "Poppins, sans-serif",
      fontSize: "14px",
      borderRadius: "10px",
      backgroundColor: "#F8F9FC",
      "& fieldset": { borderColor: "#E2E8F0" },
      "&:hover fieldset": { borderColor: "#94A3B8" },
      "&.Mui-focused fieldset": {
        borderColor: "#1E40AF",
        borderWidth: "1.5px",
      },
    },
    "& .MuiInputBase-input": {
      padding: "12px 14px",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background:
          "linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #1E40AF 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative circles */}
      {[
        { size: 400, top: "-10%", left: "-10%", opacity: 0.06 },
        { size: 300, bottom: "-5%", right: "5%", opacity: 0.05 },
        { size: 200, top: "50%", right: "20%", opacity: 0.04 },
      ].map((circle, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: circle.size,
            height: circle.size,
            borderRadius: "50%",
            border: `1.5px solid rgba(255,255,255,${circle.opacity * 2})`,
            background: `rgba(255,255,255,${circle.opacity})`,
            top: circle.top,
            left: circle.left,
            bottom: circle.bottom,
            right: circle.right,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Left branding panel */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          pl: 10,
          pr: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 5 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "14px",
              backgroundColor: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <Inventory2Outlined sx={{ color: "#fff", fontSize: 26 }} />
          </Box>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              color: "#fff",
              letterSpacing: "-0.3px",
            }}
          >
            MRM Portal
          </Typography>
        </Box>

        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "42px",
            color: "#fff",
            lineHeight: 1.2,
            mb: 2.5,
            maxWidth: 420,
          }}
        >
          Material Requirement
          <br />
          <span style={{ color: "#93C5FD" }}>Management</span>
        </Typography>

        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            color: "rgba(255,255,255,0.65)",
            mb: 5,
            maxWidth: 380,
            lineHeight: 1.7,
          }}
        >
          Streamline your procurement process, track material flow, and manage
          inventory efficiently — all in one place.
        </Typography>

        {/* Feature chips */}
        {[
          "Real-time Inventory Tracking",
          "Procurement Automation",
          "Vendor Management",
        ].map((feature) => (
          <Box
            key={feature}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#93C5FD",
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "14px",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              {feature}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Right login card */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: { xs: 1, md: "0 0 480px" },
          px: { xs: 2, sm: 4 },
          py: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Card
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 420,
            borderRadius: "24px",
            p: { xs: 3, sm: 4.5 },
            backgroundColor: "#fff",
            boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
          }}
        >
          {/* Mobile logo */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: 1,
              mb: 3,
            }}
          >
            <Inventory2Outlined sx={{ color: "#1E40AF", fontSize: 24 }} />
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                color: "#1E40AF",
              }}
            >
              MRM Portal
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "26px",
              color: "#0F172A",
              mb: 0.5,
              letterSpacing: "-0.4px",
            }}
          >
            Welcome back
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "14px",
              color: "#64748B",
              mb: 4,
            }}
          >
            Sign in to your MRM account
          </Typography>

          {/* Phone Field */}
          <Box sx={{ mb: 2.5 }}>
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                color: "#374151",
                mb: 0.8,
              }}
            >
              Username
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your Username"
              value={username}
              error={!!errors.username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({ ...prev, username: "" }));
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              sx={inputSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneOutlined sx={{ color: "#94A3B8", fontSize: 19 }} />
                  </InputAdornment>
                ),
              }}
            />
            {errors.username && (
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  color: "#EF4444",
                  mt: 0.5,
                }}
              >
                {errors.username}
              </Typography>
            )}
          </Box>

          {/* Password Field */}
          <Box sx={{ mb: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 0.8,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "#374151",
                }}
              >
                Password
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  color: "#1E40AF",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forgot password?
              </Typography>
            </Box>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              error={!!errors.password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              sx={inputSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={{ color: "#94A3B8", fontSize: 19 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                      sx={{ color: "#94A3B8" }}
                    >
                      {showPassword ? (
                        <Visibility fontSize="small" />
                      ) : (
                        <VisibilityOff fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && (
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  color: "#EF4444",
                  mt: 0.5,
                }}
              >
                {errors.password}
              </Typography>
            )}
          </Box>

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
            sx={{
              mt: 3.5,
              py: 1.4,
              borderRadius: "12px",
              backgroundColor: "#1E40AF",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              textTransform: "none",
              boxShadow: "0 4px 14px rgba(30,64,175,0.35)",
              letterSpacing: "0.1px",
              "&:hover": {
                backgroundColor: "#1D3A9C",
                boxShadow: "0 6px 18px rgba(30,64,175,0.45)",
              },
              "&:disabled": {
                backgroundColor: "#93C5FD",
                color: "#fff",
              },
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <Divider sx={{ my: 3, borderColor: "#F1F5F9" }}>
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "12px",
                color: "#94A3B8",
                px: 1,
              }}
            >
              Secure Login
            </Typography>
          </Divider>

          {/* Footer note */}
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "12px",
                color: "#94A3B8",
                lineHeight: 1.6,
              }}
            >
              Having trouble signing in?{" "}
              <span
                style={{
                  color: "#1E40AF",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Contact your administrator
              </span>
            </Typography>
          </Box>
        </Card>
      </Box>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            padding: "8px",
            minWidth: "360px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            pb: 1,
            pt: 2,
            px: 3,
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "#FEE2E2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ErrorOutlineIcon sx={{ color: "#DC2626", fontSize: 20 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: "1rem",
              color: "#111827",
              fontFamily: "Poppins",
            }}
          >
            Login Failed
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ px: 3, pb: 1, pt: 0.5 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#6B7280",
              lineHeight: 1.6,
              ml: "52px",
              fontFamily: "Poppins",
            }}
          >
            {apiError}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5, pt: 2 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="contained"
            disableElevation
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.875rem",
              fontFamily: "Poppins",
              px: 3,
              py: 1,
              backgroundColor: "#DC2626",
              "&:hover": { backgroundColor: "#B91C1C" },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
