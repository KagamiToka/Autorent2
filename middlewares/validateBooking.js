const validateBookingInput = (req, res, next) => {
    const { userId, carId, startDate, endDate } = req.body;

    if (!userId || !carId || !startDate || !endDate) {
        return res.status(400).json({ error: 'Invalid or missing userId, carId, startDate, or endDate' });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    if (isNaN(start) || isNaN(end)) {
        return res.status(400).json({ error: 'startDate and endDate must be valid dates' });
    }
    if (start >= end) {
        return res.status(400).json({ error: 'startDate must be before endDate' });
    }
    if (start < now) {
        return res.status(400).json({ error: 'startDate must be in the future' });
    }
    next();
}

module.exports = validateBookingInput;