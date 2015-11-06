IF OBJECT_ID('get_Reviews', 'P') IS NOT NULL
DROP PROCEDURE get_Reviews
GO

CREATE PROCEDURE get_Reviews
 AS
 SET NOCOUNT ON

SELECT r.Title, r.Rating, r.Content, r.CreatorID AS Username FROM Reviews r
WHERE r.ToolID = 1
ORDER BY r.ReviewID ASC-- t.Value ASC

DECLARE @Status SMALLINT
SET @Status = @@ERROR
IF @Status <> 0 
	BEGIN
	-- Return error code to the calling program to indicate failure. 
	PRINT 'An error occurred'
	RETURN(@Status)
END
ELSE 
	BEGIN
	RETURN 0
END