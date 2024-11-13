import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useObserver } from '../../hooks/useObserver'
import { AppDispatch, RootState } from '../../store'
import { Company, editCompany, getCompanies, toggleSelectAll, toggleSelectCompany } from '../../store/companiesSlice'
import styles from './CompaniesTable.module.css'

const CompaniesTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { companies, selectedIds, isLoading, page } = useSelector((state: RootState) => state.companies)
  const lastElement = useRef<HTMLDivElement | null>(null)

  useObserver(
    lastElement,
    () => {
      dispatch(getCompanies(page + 1))
    },
    isLoading
  )

  const handleSelectAll = () => {
    dispatch(toggleSelectAll())
  }

  const handleSelectCompany = (id: number) => {
    dispatch(toggleSelectCompany(id))
  }

  const handleEditCompany = (id: number, field: keyof Omit<Company, 'id'>, value: string) => {
    dispatch(editCompany({ id, field, value }))
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <colgroup>
          <col style={{ width: '4%' }} />
          <col style={{ width: '48%' }} />
          <col style={{ width: '48%' }} />
        </colgroup>
        <thead>
          <tr className={styles.tableHeaderRow}>
            <th>
              <input
                type='checkbox'
                checked={selectedIds.length === companies.length && companies.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th>Название</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <tr
              key={company.id}
              className={`${styles.tableRow} ${selectedIds.includes(company.id) ? styles.selected : ''}`}
            >
              <td>
                <input
                  type='checkbox'
                  checked={selectedIds.includes(company.id)}
                  onChange={() => handleSelectCompany(company.id)}
                />
              </td>
              <td
                contentEditable
                suppressContentEditableWarning
                onBlur={e => handleEditCompany(company.id, 'name', e.currentTarget.textContent || '')}
              >
                {company.name}
              </td>
              <td
                contentEditable
                suppressContentEditableWarning
                onBlur={e => handleEditCompany(company.id, 'address', e.currentTarget.textContent || '')}
              >
                {company.address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div ref={lastElement} style={{ height: '20px', background: 'transparent' }} />
    </div>
  )
}

export default CompaniesTable
