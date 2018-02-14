SELECT *
	, d.header_id
FROM promotions_header h
    JOIN promotions_detail d ON (h.id = d.header_id)
WHERE (
		d.billValueFrom IS NULL
    OR 789 >= d.billvalueFrom
		)
    AND (
		d.billValueTo IS NULL
    OR 789 <= d.billvalueTo
		)
    AND (
		d.promo_code IS NULL
    OR d.promo_code = 'LUCKY ONE'
		)
    AND (
		d.number_of_seat IS NULL
    OR d.number_of_seat = 2
		)
 