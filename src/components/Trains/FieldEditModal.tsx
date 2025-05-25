"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";

interface Props {
  open: boolean;
  label: string;
  value: string | number;
  onClose: () => void;
  onSave: (newValue: string | number) => void;
}

export const FieldEditModal = ({
  open,
  label,
  value,
  onClose,
  onSave,
}: Props) => {
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    setInput(String(value));
  }, [value]);

  const handleSave = () => {
    onSave(input);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit {label}</DialogTitle>
      <DialogContent sx={{ overflowY: "unset" }}>
        <TextField
          autoFocus
          fullWidth
          label={label}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
