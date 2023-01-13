import * as React from "react";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";

import Dialog from "../../base/Dialog";
import TextField from "../../base/TextField";
import { useAppDispatch } from "../../ducks";
import { productActions } from "../../ducks/actions/products";
import { RESET_OPTIONS } from "../../constants/form";
// TODO: add the types file in tsconfig
import { AddProductInputs } from "../../types";

const INITIAL_VALUES = {
  productName: "",
  price: 0,
  availableQuantity: 0,
  description: "",
  isAvailable: false,
  files: undefined,
};

const AddProduct = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<AddProductInputs>({
    mode: "all",
    defaultValues: INITIAL_VALUES,
  });
  const dispatch = useAppDispatch();
  const [isAvailable, availableQuantity, files] = watch([
    "isAvailable",
    "availableQuantity",
    "files",
  ]);
  const invalidQuantity =
    Number(availableQuantity) === 0 || !!errors?.["availableQuantity"];

  React.useEffect(() => {
    if (invalidQuantity) {
      setValue("isAvailable", false);
    }
  }, [invalidQuantity]);

  React.useEffect(() => {
    if (open) {
      reset(INITIAL_VALUES, RESET_OPTIONS);
    }
  }, [open]);

  const onClose = (event: React.SyntheticEvent | {}, clicked: boolean) => {
    if (clicked && isValid) {
      return handleSubmit((data) => {
        const formData = new FormData();

        formData.append("productName", data.productName);
        formData.append("price", data.price.toString());
        formData.append("availableQuantity", data.availableQuantity.toString());
        formData.append("description", data.description ?? "");
        formData.append("isAvailable", data.isAvailable ? "true" : "false");
        if (data.files?.[0]) formData.append("image", data.files[0]);

        // TODO: check if passing success cb is ok
        dispatch(
          productActions.addProduct(formData, () => {
            setOpen(false);
            reset(INITIAL_VALUES, RESET_OPTIONS);
          })
        );
      })();
    } else if (!clicked) {
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={false}
      buttonLabel="Add"
      title="Add product"
      disableButton={!isValid}
    >
      <Box sx={{ minWidth: 300, p: 2 }}>
        <Stack>
          {files?.[0] && (
            <Container sx={{ textAlign: "center" }}>
              <img
                src={URL.createObjectURL(files[0])}
                alt="Uploaded image"
                style={{ maxWidth: 200, maxHeight: 200 }}
              />
            </Container>
          )}
          <TextField
            label="Product name"
            {...register("productName", {
              required: true,
            })}
            error={!!errors.productName}
          />
          <TextField
            label="Available quantity"
            {...register("availableQuantity", {
              required: true,
              pattern: /^\d+$/,
            })}
            error={!!errors.availableQuantity}
          />
          <TextField
            label="Price"
            {...register("price", {
              required: true,
              pattern: /^([0-9]*[.])?[0-9]+$/,
            })}
            error={!!errors.price}
          />
          <TextField label="Description" {...register("description")} />
          <TextField
            label="Upload image"
            InputLabelProps={{
              shrink: true,
            }}
            type="file"
            inputProps={{
              accept: "image/*",
            }}
            {...register("files")}
          />
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={isAvailable}
                {...register("isAvailable", {
                  onChange: (event) => {
                    setValue("isAvailable", !isAvailable);
                  },
                })}
              />
            }
            label="Make it available"
            labelPlacement="start"
            disabled={invalidQuantity}
          />
        </Stack>
      </Box>
    </Dialog>
  );
};

export default AddProduct;
