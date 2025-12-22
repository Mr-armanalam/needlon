import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type Address = {
  id: string;
  userId: string;
  name: string;
  phone: string;
  pincode: string;
  locality: string;
  address: string;
  city: string;
  state: string;
  landmark: string;
  alternate_phone: string;
  createdAt: Date;
  updatedAt: Date;
};

interface AddressState {
  addresses: Address[];
  loading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  addresses: [],
  loading: true,
  error: null,
};

// ✅ Fetch all addresses
export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAll",
  async (userId: string) => {
    const res = await fetch(`/api/addresses?userId=${userId}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.addresses as Address[];
  }
);

export const addOrUpdateAddress = createAsyncThunk(
  "addresses/addOrUpdate",
  async ({
    userId,
    data,
    editingAddressId,
  }: {
    userId: string;
    data: Omit<Address, "id" | "createdAt" | "updatedAt">;
    editingAddressId?: string;
  }) => {
    const res = await fetch("/api/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, data, editingAddressId }),
    });
    const result = await res.json();
    if (!result.success) throw new Error(result.message);
    return result;
  }
);

// ✅ Delete address
export const deleteAddress = createAsyncThunk(
  "addresses/delete",
  async (id: string) => {
    const res = await fetch("/api/addresses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const result = await res.json();
    if (!result.success) throw new Error(result.message);

    return id;
  }
);

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch addresses";
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (a) => a.id !== action.payload
        );
      });
  },
});

export default addressSlice.reducer;
