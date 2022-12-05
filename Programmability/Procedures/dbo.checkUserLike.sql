SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 11/10/2022
-- Description:	Retrives a record if the user has liked an specific post
-- =============================================
CREATE PROCEDURE [dbo].[checkUserLike] 
	-- Add the parameters for the stored procedure here
	@userID varchar(37) = null,
	@postID varchar(37) = null

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT		*
	FROM		PostLikes
	WHERE		userID = @userID
	AND			postID = @postID

END
GO