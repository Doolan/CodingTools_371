IF OBJECT_ID('get_ReviewsList', 'P') IS NOT NULL
DROP PROCEDURE get_ReviewsList
GO

CREATE PROCEDURE get_ReviewsList
(@ToolId INT)
 AS
 SET NOCOUNT ON

SELECT r.Title, r.Rating, r.Content, u.Username 
FROM Reviews r
JOIN Users u ON u.UserID = r.CreatorID
WHERE r.ToolID = @ToolId
ORDER BY r.ReviewID ASc


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