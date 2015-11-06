USE codingtoolsdev
IF OBJECT_ID('[dbo].[get_TagList]') IS not NULL
    DROP PROCEDURE [dbo].get_TagList
GO

CREATE PROCEDURE get_TagList
 AS
 SET NOCOUNT ON

SELECT t.TagId, t.Name, t.Value, tc.Name AS CategoryName, ISNULL(t.ImgPath,'') AS ImgPath FROM Tags t
JOIN TagCategories tc ON tc.TagCategoryId = t.TagCategoryId
ORDER BY tc.Name ASC,t.TagId ASC-- t.Value ASC

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
GO