const addValue = (setFormValues, newValue) => {
	setFormValues(prev => {
		return({...prev, newValue})
	})
}

