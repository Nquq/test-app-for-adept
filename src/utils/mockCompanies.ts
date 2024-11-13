const allCompanies = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  name: `Company ${index + 1}`,
  address: `Address for company ${index + 1}`,
}))

export const getCompaniesByPage = (page: number, pageSize: number) => {
  const start = page * pageSize
  return allCompanies.slice(start, start + pageSize)
}
