SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 04/10/2022
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[updateComment] 
	-- Add the parameters for the stored procedure here
	@commentID varchar(37) = null,
	@postID varchar(37) = null,
	@userID varchar(37) = null,
	@commentText varchar(MAX) = null, 
	@commentEditDate datetime = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE	Comments 
	SET		commentText = @commentText, commentEditDate = @commentEditDate
	WHERE	postID = @postID
	AND		commentID = @commentID
	AND		userID = @userID
END
GO