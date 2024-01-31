import { ChipProps } from '@nextui-org/chip'

export const statusColorMap: Record<string, ChipProps['color']> = {
  true: 'success',
  false: 'danger'
}

export const displayDate = (date: Date | null): string => {
  return date ? date.toISOString().split('T')[0] : ''
}

export const formatGender = (gender: string): string => {
  return gender === '1' ? 'Masculino' : 'Femenino'
}

export const calculateAge = (birthdate: Date | null): number => {
  if (!birthdate) {
    return 0 // O el valor que desees cuando la fecha de nacimiento es nula
  }

  const today = new Date()
  const birthDate = new Date(birthdate)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--
  }

  return age
}

export const parseStringToDate = (str: string): Date | null => {
  return str ? new Date(`${str}T00:00:00Z`) : null
}

export const formatMaternal = (maternal: string | null | undefined): string => {
  if (!maternal) return ''
  return maternal.charAt(0).toUpperCase() + '.'
}
