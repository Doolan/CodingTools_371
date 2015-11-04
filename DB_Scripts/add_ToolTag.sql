IF OBJECT_ID('add_ToolTag', 'P') IS NOT NULL
DROP PROCEDURE [dbo].add_ToolTag
GO

CREATE PROCEDURE [add_ToolTag]
	@ToolId_1 int,
	@TagId_2 int
AS
	SELECT @param1, @param2

INSERT INTO [ToolTags]
([ToolId], [TagId])
VALUES (@ToolId_1, @TagId_2)

RETURN 0
