
Select @billValue = 6001, @promoCode = null, @numberOfSeat = null;
Select @billValue , @promoCode, @numberOfSeat;


SELECT h.*, d.*
detail_description 
    FROM promotions_header h JOIN promotions_detail d ON
(h.id = d.header_id)
    WHERE
( @billValue IS NULL OR   @billValue  >= d.billvalueFrom   )
        AND
( @billValue IS NULL OR   @billValue <= d.billvalueTo )
        AND
( @promoCode IS NULL  OR d.promo_code = @promoCode )
        AND
( @numberOfSeat IS NULL OR d.number_of_seat = @numberOfSeat )