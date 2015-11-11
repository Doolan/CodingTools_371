IF OBJECT_ID('get_user', 'P') IS NOT NULL
DROP PROCEDURE get_user
GO

CREATE PROCEDURE [get_user]
	@Username nvarchar(30),
	@PasswordHash binary(64),
	@PasswordSalt binary(64)
AS

DECLARE @UserId int

SELECT @UserId=UserId FROM Users WHERE Username = @Username
RETURN @UserId