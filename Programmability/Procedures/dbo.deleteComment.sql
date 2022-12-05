SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 04/10/2022
-- Description:	Delete the selected comment
-- =============================================
CREATE PROCEDURE [dbo].[deleteComment]
	-- Add the parameters for the stored procedure here
	@postID varchar(37) = null,
	@userID varchar(37) = null,
	@commentID varchar(37) = null

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DELETE FROM Comments
	WHERE		userID = @userID
	AND			commentID = @commentID

	SELECT		a.userID,
				a.commentID,
				a.commentText,
				a.commentCreationDate,
				b.firstName,
				b.lastName
	
	FROM		Comments a
	
	LEFT JOIN	Users b	
	
	ON			a.userID = b.userID

	WHERE		a.postID = @postID

	SELECT		postID,
				COUNT(*) as quantity

	FROM		Comments

	WHERE		postID = @postID

	GROUP by	postID
END
GO