function fish_prompt
  # blue working directory
  set_color blue
  
  # function to get current working directory plus one level up
  echo -n (pwd_plus_one)
  
  # get the current git branch, using vcprompt (installed via homebrew)
  set branch (vcprompt -f '%b')
  
  if test -n "$branch"
    set gitstatus (vcprompt -f '%m')
    # we have a git branch
    if test -n "$gitstatus"
      # git status is dirty
      set_color yellow
    else
      # git status is clean
      set_color brblack
    end
    
    # now that we have set our color, print the git branch.
    echo -n " [$branch]"
  end
  
  set_color purple
  echo -n " ❯ "
  set_color normal
end