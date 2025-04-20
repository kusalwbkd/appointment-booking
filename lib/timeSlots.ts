export function generateTimeSlots(startTime: string, endTime: string): string[] {
    const slots: string[] = []

    const [startHour, startMin] = startTime.split('.').map(Number)
    const [endHour, endMin] = endTime.split('.').map(Number)

    let current = new Date()
    current.setHours(startHour, startMin, 0, 0)

    const end = new Date()
    end.setHours(endHour, endMin, 0, 0)

    while (current <= end) {
        const hours = current.getHours()
        const minutes = current.getMinutes()
        const ampm = hours >= 12 ? 'PM' : 'AM'

        // Convert to 12-hour format
        const displayHour = hours % 12 === 0 ? 12 : hours % 12
        const displayMin = minutes.toString().padStart(2, '0')

        slots.push(`${displayHour}:${displayMin} ${ampm}`)

        // Add 15 minutes
        current.setMinutes(current.getMinutes() + 15)
    }

    return slots
}
