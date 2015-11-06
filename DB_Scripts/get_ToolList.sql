USE codingtoolsdev
IF OBJECT_ID('[dbo].[get_ToolList]') IS not NULL
    DROP PROCEDURE [dbo].get_ToolList
GO

CREATE PROCEDURE get_ToolList
 AS
 SET NOCOUNT ON

SELECT ToolID, Name, URL, [Description], ImgPath, TagName, TagValue, CategoryName 
FROM Tool_View
ORDER BY Name ASC, 
TagValue ASC, 
CategoryName ASC

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