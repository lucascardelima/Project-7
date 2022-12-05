SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 24/09/2022
-- Description:	Create the comment attached to a post
-- =============================================
CREATE PROCEDURE [dbo].[createComment] 
	-- Add the parameters for the stored procedure here
	@commentID varchar(37) = null,
	@postID varchar(37) = null,
	@userID varchar(37) = null,
	@commentText varchar(MAX) = null,
	@commentCreationDate datetime = null, 
	@commentEditDate datetime = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO Comments (commentID, postID, userID, commentText, commentCreationDate, commentEditDate)
	VALUES (@commentID, @postID, @userID, @commentText, @commentCreationDate, @commentEditDate)

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