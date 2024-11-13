import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCompaniesByPage } from '../utils'

export interface Company {
  id: number
  name: string
  address: string
}

interface CompaniesState {
  companies: Company[]
  selectedIds: number[]
  page: number
  isLoading: boolean
}

const initialState: CompaniesState = {
  companies: getCompaniesByPage(0, 20),
  selectedIds: [],
  page: 0,
  isLoading: false,
}

export const getCompanies = createAsyncThunk('companies/getCompanies', async (newPage: number) => {
  try {
    const newCompanies = getCompaniesByPage(newPage, 20)

    await new Promise(resolve => setTimeout(resolve, 1000))

    return { newCompanies, newPage }
  } catch (error) {
    console.error(error)
  }
})

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: state => {
      state.companies.unshift({
        id: new Date().getTime(),
        name: 'Example Company',
        address: 'Example Address',
      })
    },
    deleteSelectedCompanies: state => {
      state.companies = state.companies.filter(company => !state.selectedIds.includes(company.id))
    },
    toggleSelectCompany: (state, action: PayloadAction<number>) => {
      if (state.selectedIds.includes(action.payload)) {
        state.selectedIds = state.selectedIds.filter(id => id !== action.payload)
      } else {
        state.selectedIds.push(action.payload)
      }
    },
    toggleSelectAll: state => {
      if (state.selectedIds.length === state.companies.length) {
        state.selectedIds = []
      } else {
        state.selectedIds = state.companies.map(company => company.id)
      }
    },
    editCompany: (state, action: PayloadAction<{ id: number; field: keyof Omit<Company, 'id'>; value: string }>) => {
      const { id, value, field } = action.payload
      const company = state.companies.find(company => company.id === id)

      if (company) {
        company[field] = value
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCompanies.pending, state => {
        state.isLoading = true
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        const { newPage, newCompanies } = action.payload!

        state.page = newPage
        state.companies = [...state.companies, ...newCompanies]
        state.isLoading = false
      })
      .addCase(getCompanies.rejected, state => {
        state.isLoading = false
      })
  },
})

export const { addCompany, deleteSelectedCompanies, toggleSelectCompany, toggleSelectAll, editCompany } =
  companiesSlice.actions

export default companiesSlice.reducer
