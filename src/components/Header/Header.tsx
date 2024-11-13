import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { addCompany, deleteSelectedCompanies } from '../../store/companiesSlice'
import styles from './Header.module.css'

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteSelectedCompanies())
  }

  const handleAddCompany = () => {
    dispatch(addCompany())
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Список компаний</h1>
      <nav className={styles.nav}>
        <button onClick={handleAddCompany} className={styles.navButton}>
          Добавить компанию
        </button>
        <button onClick={handleDelete} className={styles.navButton}>
          Удалить выбранные
        </button>
      </nav>
    </header>
  )
}

export default Header
