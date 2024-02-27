const rules = {
  name: {
    required: 'Se requiere el nombre',
    minLength: {
      value: 3,
      message: 'El nombre debe tener al menos 3 caracteres',
    },
    maxLength: {
      value: 50,
      message: 'El nombre debe tener menos de 50 caracteres',
    },
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: 'El nombre solo puede contener letras y espacios',
    },
  },
  lastName: {
    required: 'Se requiere el apellido',
    minLength: {
      value: 3,
      message: 'El apellido debe tener al menos 3 caracteres',
    },
    maxLength: {
      value: 50,
      message: 'El apellido debe tener menos de 50 caracteres',
    },
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: 'El apellido solo puede contener letras y espacios',
    },
  },

  patientId: {
    required: "Se requiere la cédula",
    pattern: {
      value: /^[V]-\d{7,9}$/,
      message: "Formato de CI inválido",
    },
  },

  description: {
    required: "Se requiere una descripción",
    minLength: {
      value: 20,
      message: 'La descripción debe tener al menos 20 caracteres',
    },
  },
  medicalArea: {
    required: "Área médica requerida",
  },
  doctor: {
    required: "Médico es requerido",
  },
  date: {
    required: "La fecha es requerida",
  },
  time: {
    required: "La hora es requerida",
  },
}

export default rules
